describe("Product Page Test", () => {
  const verifyArticleElements = ($article) => {
    // Verify elements within the article
    cy.wrap($article).within(() => {
      cy.get('[data-cy="product-home-img"]').should("be.visible");
      cy.get('[data-cy="product-home-name"]').should("be.visible");
      cy.get('[data-cy="product-home-ingredients"]').should("be.visible");
      cy.get('[data-cy="product-home-link"]').should("be.visible");
    });
  };

  it("Verify articles and their detail pages", () => {
    cy.visit("http://localhost:8080/");

    cy.get('[data-cy="product-home"]').then(($articles) => {
      const articleCount = $articles.length;

      for (let index = 0; index < articleCount; index++) {
        // Re-fetch articles before each iteration
        cy.get('[data-cy="product-home"]')
          .eq(index)
          .then(($article) => {
            verifyArticleElements($article);

            cy.wrap($article).find('[data-cy="product-home-link"]').click();

            cy.get('[data-cy="detail-product-img"]').should("be.visible", {
              timeout: 10000,
            });
            cy.get('[data-cy="detail-product-description"]').should(
              "be.visible",
              {
                timeout: 10000,
              }
            );
            cy.get('[data-cy="detail-product-price"]').should("be.visible", {
              timeout: 10000,
            });
            cy.get('[data-cy="detail-product-stock"]').should("be.visible", {
              timeout: 10000,
            });

            cy.go("back");

            // Ensure product elements are still visible after navigating back
            cy.get('[data-cy="product-home"]').should("exist");
          });
      }
    });
  });
});
