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

                // Exibe o modal
                const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
                myModal.show();
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }
});
