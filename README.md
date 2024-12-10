# Django Gallery Project

## Descrição
🎨 Este projeto, **Django Gallery**, é um sistema web de galeria de imagens desenvolvido com o framework **Django 5** e estilizado com **Bootstrap 5**. Ele foi criado como parte do **projeto de conclusão da matéria de WebDesign** do quarto semestre do curso técnico em Informática para Internet. O projeto é funcional e foi hospedado na nuvem utilizando serviços como **AWS EC2**, **RDS**, e **Nginx + Gunicorn** para configuração de servidor, além de implementar **certificado SSL** para garantir segurança nas conexões. 🌟✨📷

## Principais Funcionalidades
- **Sistema de Galeria** 📸:
  - Exibição de imagens dinâmicas com título, legenda e descrição.
  - Modal interativo para visualização de detalhes das fotografias.
  - Links para atualizar ou deletar cada fotografia diretamente do modal.
- **Upload de Imagens** 🚀:
  - Possibilidade de fazer upload de imagens via painel de administração do Django.
- **Estilização Responsiva** 📱:
  - Layout responsivo utilizando Bootstrap 5 para uma experiência amigável em diferentes dispositivos.
- **Infraestrutura na Nuvem** ☁️:
  - Hospedagem no **AWS EC2**.
  - Banco de dados **RDS (PostgreSQL)** para armazenamento de dados.
  - Configuração de servidor **Nginx + Gunicorn**.
  - Certificado **SSL** para conexões seguras via HTTPS. 🌟

## Tecnologias Utilizadas
- **Back-End** ⚙️:
  - Django 5
  - Python 3
- **Front-End** 🎨:
  - Bootstrap 5
  - JavaScript
- **Banco de Dados** 🗄️:
  - PostgreSQL (via AWS RDS)
- **Infraestrutura** 🌐:
  - AWS EC2
  - AWS RDS
  - Nginx + Gunicorn
  - Let's Encrypt (SSL) 🔧

## Arquitetura do Projeto
🎯 1. **Modelagem de Dados**:
```mermaid
classDiagram
    class Fotografia {
        +String nome
        +String legenda
        +String descricao
        +ImageField foto
    }
```
🎯 2. **Frontend**:
   - As imagens são exibidas em um layout de galeria responsivo.
   - Ao clicar em uma imagem, um modal é aberto com as informações detalhadas da fotografia.

🎯 3. **Interatividade**:
   - O arquivo `main.js` faz requisições AJAX para buscar os detalhes das imagens e atualizá-los dinamicamente no modal.

### Exibição Dinâmica com Bootstrap e AJAX
Para a funcionalidade de modais dinâmicos com Bootstrap e integração de AJAX, a implementação foi feita com os seguintes passos:

1. **Estrutura HTML do Modal**:
   No template `fotografias_list.html`, adiciona-se o modal vazio que será preenchido dinamicamente:
   ```html
   <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title" id="photoTitle"></h5>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                   <img id="photoImage" class="img-fluid" src="" alt="">
                   <p id="photoDescription"></p>
                   <small id="photoLegend"></small>
               </div>
           </div>
       </div>
   </div>
   ```

2. **Função JavaScript com AJAX**:
   O arquivo `main.js` é responsável por capturar os eventos de clique e fazer a requisição AJAX:
   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       const modal = new bootstrap.Modal(document.getElementById('photoModal'));

       document.querySelectorAll('.photo-card').forEach(card => {
           card.addEventListener('click', function() {
               const photoId = this.dataset.id;
               fetch(`/fotografia/${photoId}/`)
                   .then(response => response.json())
                   .then(data => {
                       document.getElementById('photoTitle').innerText = data.nome;
                       document.getElementById('photoImage').src = data.foto_url;
                       document.getElementById('photoDescription').innerText = data.descricao;
                       document.getElementById('photoLegend').innerText = data.legenda;
                       modal.show();
                   });
           });
       });
   });
   ```

3. **Endpoint para Dados da Fotografia**:
   No `views.py`, foi implementada a função `fotografia_detail` para retornar as informações em JSON:
   ```python
   from django.http import JsonResponse
   from django.shortcuts import get_object_or_404
   from .models import Fotografia

   def fotografia_detail(request, pk):
       fotografia = get_object_or_404(Fotografia, pk=pk)
       data = {
           "nome": fotografia.nome,
           "legenda": fotografia.legenda,
           "descricao": fotografia.descricao,
           "foto_url": fotografia.foto.url if fotografia.foto else "",
       }
       return JsonResponse(data)
   ```

## Estrutura do Projeto
📁 **Estrutura de Diretórios**:
```bash
$ tree

project_root/
├── gallery/          # App principal
│   ├── apps.py       # Configurações do app Django
│   ├── models.py     # Modelos Django
│   ├── urls.py       # Rotas do app
│   ├── views.py      # Views para manipulação das fotografias
├── media/            # Diretório para uploads de imagens
├── manage.py         # Script de gerenciamento do Django
├── setup/            # Configurações do projeto
│   ├── settings.py   # Configurações gerais do Django
│   ├── urls.py       # Rotas principais
├── templates/    # Templates HTML

```

## Configurações de Hospedagem
🌐 1. **AWS EC2**:
   - Instância Linux configurada para hospedar a aplicação Django.
   - Configuração de grupo de segurança para permitir tráfego HTTP e HTTPS.

🌐 2. **Nginx + Gunicorn**:
   - Nginx utilizado como proxy reverso para o Gunicorn.
   - Configuração otimizada para alta performance.

🌐 3. **RDS (PostgreSQL)**:
   - Banco de dados relacional para armazenar informações das fotografias.

🌐 4. **Let's Encrypt**:
   - Certificado SSL gerado para conexões seguras (HTTPS).

## Como Rodar o Projeto Localmente
⚙️ 1. **Clone o repositório**:
   ```bash
   git clone https://github.com/usuario/django-gallery.git
   cd django-gallery
   ```

⚙️ 2. **Crie um ambiente virtual**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

⚙️ 3. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt
   ```

⚙️ 4. **Aplique as migrações**:
   ```bash
   python manage.py migrate
   ```

⚙️ 5. **Inicie o servidor local**:
   ```bash
   python manage.py runserver
   ```

⚙️ 6. **Acesse o projeto**:
   Abra o navegador e acesse: `http://127.0.0.1:8000` 🌍✨

## Screenshots
- **Galeria de Imagens**:
  ![Galeria pt. 1](https://ff-photo-gallery.s3.us-east-1.amazonaws.com/Captura%20de%20tela%202024-12-09%20211635.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIATCKAPGS3UYZE35QN%2F20241210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241210T002009Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCICGyaPgC5qmbpmozDSnfLWDQ1n714mUb8uyoWsPn4y5pAiEArw6voueEoWWOPGc160k2CcURe%2BaQ83poDihtl2XUisQqjAMIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyMTExMjU0ODI2NzkiDEJI%2Faqmqc2bxtVklSrgAqu%2FMm5gcOgbWqzcWN%2B7my6schwE7Q8nA5aKTEmurxlFQICFCZZ8E3%2B3c88jLoKJKLOEkrRaKcqV6k546s3tvTx1Eatmx1srG5iWee4A3giiXezD6lER867v94Q7rkaUIF%2Bt68bKug8CSbA00vShOZamdvmoYiKZOWzb1pK%2BArKKmKwMYcPB3lI7Sc4%2Bl30Jk3puvzwfcup%2FMybUU94%2BVY%2FpitWO%2B0hdZGyxLbryi3HHgG90P82BaAFLE7nASGjQWDMiatW0Zwa95kLBSIX524kM%2FqiRMLspeZwncmIb1mpa8EWH%2FakYoCdeFohhIKaHzAT8Xspql%2B72RQB0B2VtACU%2F%2FNPoqyM6tZ6bPpcPllMeD5jj6%2BJrZ9%2FSUisR8dZK%2BvAFxbZgdQgnehwCXwu%2B13gyjp4%2BR1GtTJMCVjSy0iIADe4hXC2djqXr3vfO1OxyCPQRGBNox%2BBf0ITgoIp6WNowp5HeugY6swIngbIBuAczE8G42p5EYkV4F4Lp1%2FxLApJuJnaUbUAuKiXfjaVwkqPyFh%2FsW2RvKT8gmYfKZHb%2BkZ6Sf0TO4%2Fs2WK8MPApq5FXubNubKq8XyyZS23Zl5QdyyA5HfQn2tYivIo7mDyd452Z8AnHBIwMHp7bWC5wYNlZvs1hhku32zSb7Jky%2Bt6iyYqlrmQ0LdX%2FbxKzJzxoT8bu8K1FSD2swi3E%2B3XV0DNSJ0kkrqYtabEFhPmtATR49MeGf4LxaU%2FBL2ZxFnK9fZL1sSboLrUbfA2kVkQ6tQpeiJVxsUIw8u9OpZPqr1DSmQi0iXD6VSB3smjJEAfw6SqrUFK7bhV8QXE98GtBdD%2F%2Fg6CLBmtFG9kisVL2syQk1eONmMyd%2BFH5Puwl%2FNZyu8wqWGobtyeZQbwkl&X-Amz-Signature=35066779d422caeae1b4ef3a721a126e880c5e0dcc353e0ee4c19de4c9113631&X-Amz-SignedHeaders=host&response-content-disposition=inline) 🖼️
  ![Galeria pt. 2](https://ff-photo-gallery.s3.us-east-1.amazonaws.com/Captura%20de%20tela%202024-12-09%20211649.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIATCKAPGS36UPHPDWU%2F20241210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241210T002134Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIB09aog2ASHdF8QeOlquXDioauZL%2FKOwi65tt3YaTlCeAiAMCg2cezaLHo%2BdI%2FsP%2FwZQiRewDLlyw0tpscI0qEotviqMAwiB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDIxMTEyNTQ4MjY3OSIM%2FRM3YINeKTdydKB1KuACfTu%2B%2Fbk%2FR6lM7EINGCjnNVE7stAl92JI2d2hAduCa5sDZyFWf8wdOOKyxr9v7XO%2Fqibo9PhwF3vvCfjdXmzeVl5qP%2B5xNBYllLTgCOZz7jVjeenHHko1XNcEK3NyzMsII7M7P3hF2gPziIHVQMMp9uMFiw0EUQn9a%2Ftz6UTnwQnYhIPhsEpGyLKMXqdfj3ShzNwoTCE%2FSPjMNddYn7TI%2BYJf%2FV%2BKVz3iRl%2Bc7ORVQTaYqJHBIKmwRBSQxD6I4NHDoWA0EAv2X%2FEPydFEQBQUGIdq9oq%2BGZtRZVIj5vbhZVT5YWngDWCLySQymUhYIurDWwsEk8JjM3iFK7al1VCnn54Nsne5snov2PNuW23MiyqTDdCD%2BdMHGHn%2B4cpQb2EJsOxIcAquUfq6B35rSdL5tb4Ffqv7Aiiva26%2F8rc4EEytd8JZT8GUlCYi7b3tIvM5swlPIMEr09fXZ%2BOSIQSqATCnkd66Bjq0Agz%2BXWDkQ%2FAlxKxWKj1g1ww54yh0Pjck%2FZ9LBTz%2ByU1%2FJHv0tRth6VI2K5G06yY%2BPWKrnqawBX%2FXh7KIhOm6GsZ41q%2FiK5rg67oj6htrfO%2BKgmqHX5ETxmWhAXgJpgTm1rJURGgNiwJ4%2FMDU9qPCrTs9qffRuWaCJdfs0wdGNSjQNUn3tutuUotG9Tf9c00HCJqroPsGSgyPyG4ayOrXpYnXoZ5TJzRQAeotYdN9oBXJedjVQ33I5wAVZ1xAWg3nKQxTAkwvEyzlH4VosyXU7Vz8QzlDUvBGvySKX7BtbRUlnSeGlwqVZ8q%2BYzs6FAFXMXlmUFcWV08n3OzJ1yBnz3Lw93ZLGObSp2wMqvrX9a2iOdkUO2rkONuojMBk%2Ffc%2BxfQri4LhVq7mOvzW875m1XJ2weqB&X-Amz-Signature=f1b08cd3bbecd043e489713d057a3cdd2f44d22f5ab844bbfb828a99ca1de148&X-Amz-SignedHeaders=host&response-content-disposition=inline)

- **Modal de Detalhes**:
  ![Modal](https://ff-photo-gallery.s3.us-east-1.amazonaws.com/Captura%20de%20tela%202024-12-09%20212228.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIATCKAPGS35XP7KVAK%2F20241210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241210T002345Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGAz9oJlb3YNFpN0g%2BP0DpFCU1p3fDFwCUWDEjtQ4OMEAiB3Yp8TAP263%2FJdv1Bcg6Ru%2B2KTfqL4Kb4FB26prcUs7iqMAwiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDIxMTEyNTQ4MjY3OSIMtCrDVwU8bDGk0IgiKuACh4w5VghkbkqZeOuzD%2BwMcriffA%2BWSUaAzIx07wtUeMuxzazoVeYn7vMH1sHikGBpwWo6kteHeV2QGX7ES7rlRfo3w92UVhcRzY0GGmRcaFqI%2Fpiicq2NqAr%2FEhsLddxxrx0%2BA0GNrcWebYP5RCKXYb%2Bh77lbpz%2FkGUgz5y0JqaZdyAeKB9CeDkAITG%2BrhmlD8jtqfdoqxnDTjSP%2BaxFUKcl%2B%2BwpCxSarHHznTnAQweDjcS93CDeUME55Gdh2lQYK5FjcL3I0ltpbP%2FCMy6EsLRGhSrGyKRIKQJBJ41Sv27sZN7DXbRGO4zwLNqVzhGcy%2FMO0C8IyLuuDiOj%2BlgRMKa%2F4AUKVTfDAlPtSGzh%2F%2FBDJxlIoccpTkC5tCnc3acTKCmrpBQ8a%2B9I8Le31UTyqk%2B6zT1UJ23RTzx%2FGw46duBOm1XpHCNwGZLwnudrVuEU%2Bd2xCaWLAWnwp90EGW15S7zCnkd66Bjq0ApHZBvZcVkqqHs755dbki0D%2BV0T%2BeCIrjagj5Qiy0KV9jy5NSTQOnq9DI9X3a0nki7NU3NUlWH1MVWVBfFcs8H5d6BZ5imgDfhIkSlz%2BYQX%2FumRrzXJXfwBv0%2FqQ4LQUdeQrhA7UI26kOvKn%2Bt6BVjnHgmdAXBLcAwUd2FBGyZl3TFopbQTdt05yAK4uoFgjDmqEHbF4UNrWMUIul3Me09ERt0AuquK6GnTTKo6KMhXsoDe37UEHlxs55gt1pV1e859w85OPh0TKH6jXW6rLlyoJ0zZRYGknlmLsBL8Unr3zVf2Y6wId2sFYmOv5lC3q9%2BRD%2FRxv2WQmagUIYw5dNzGOo7peypgWhh4Gbu4aznU%2FFwQQVe%2Be1nL8hWewt2zRSpf%2FYKlMOvQWialTClBvpXiPmnBV&X-Amz-Signature=b9b56c29a48779ed5323286492836a3bbc6644f4b6cb7eb72eb1c1f6fe962e2e&X-Amz-SignedHeaders=host&response-content-disposition=inline) 🔍

## Aprendizados e Desafios
📘 **Aprendizados**:
  - Configuração completa de um servidor com Nginx e Gunicorn.
  - Implementação de segurança com SSL e configuração de infraestrutura na AWS.

📘 **Desafios**:
  - Configurar e integrar os serviços da AWS.
  - Garantir que o projeto fosse responsivo e funcional em diferentes dispositivos.

## Autor
Projeto desenvolvido por FernandoAurelius, estudante do curso técnico em Informática para Internet do CEMI. ✨

---
📩 Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue no repositório ou entrar em contato! 🌟

