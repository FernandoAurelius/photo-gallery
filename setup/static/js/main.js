document.addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery-item")) {
        const fotografiaId = e.target.getAttribute("data-id");

        // Faz uma requisição AJAX para obter os detalhes da fotografia
        fetch(`/fotografia/${fotografiaId}/`)
            .then(response => response.json())
            .then(data => {
                // Atualiza o conteúdo do modal com os dados recebidos
                document.querySelector(".modal-img").src = data.foto_url;
                document.querySelector(".modal-title").textContent = data.nome;
                document.querySelector(".modal-legenda").textContent = data.legenda;
                document.querySelector(".modal-descricao").textContent = data.descricao;
                const src = e.target.getAttribute("src");
                const pk = e.target.getAttribute("data-pk");  // Captura o atributo data-pk da imagem

                // Verifica se o atributo data-pk existe
                if (pk) {
                    // Atualiza o src da imagem no modal
                    document.querySelector(".modal-img").src = src;

                    // Atualiza os links de Atualizar e Deletar com o pk correto
                    document.querySelector("#photo-update-link").href = `/update/${pk}`;
                    document.querySelector("#photo-delete-link").href = `/delete/${pk}`;

                    // Exibe o modal
                    const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
                    myModal.show();
                } else {
                    console.error('O atributo data-pk não foi encontrado na imagem.');
                }
            }
        )
    }
});
