// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Elementos do DOM
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.cart-icon');
const userIcon = document.querySelector('.user-icon');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');

// Função para atualizar o contador do carrinho
function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    // Salvar carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para adicionar produto ao carrinho
function addToCart(product) {
    cart.push(product);
    cartCount++;
    updateCartCount();
    
    // Animação de feedback
    if (event && event.target) {
        const button = event.target;
        button.textContent = 'Adicionado!';
        button.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            button.textContent = 'Adicionar ao Carrinho';
            button.style.backgroundColor = '';
        }, 1500);
    }
}

// Inicializar contagem do carrinho na carga da página
if (cartCountElement) {
    updateCartCount();
}

// Redirecionar para o carrinho ao clicar no ícone
if (cartIcon) {
    cartIcon.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });
}

// Adicionar evento de clique aos botões
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const product = {
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.discounted-price').textContent,
            image: productCard.querySelector('img').src
        };
        addToCart(product);
    });
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
        navbar.style.backgroundColor = 'var(--secondary-color)';
        navbar.style.boxShadow = 'none';
    }
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio do formulário
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Feedback visual
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.backgroundColor = '#2ecc71';
            
            // Reset do formulário
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.product-card, .about-content, .contact-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Função para mostrar mensagem de login
function handleUserClick() {
    alert('Área de login em desenvolvimento!');
}

// Função para abrir o modal
function openModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        // Adicionar classe active para exibir o modal
        loginModal.classList.add('active');
        document.body.classList.add('no-scroll'); // Previne rolagem do body
        
        // Pequeno atraso para garantir que a animação seja exibida corretamente
        setTimeout(() => {
            const modalContainer = loginModal.querySelector('.modal-container');
            if (modalContainer) {
                modalContainer.style.transform = 'translateY(0)';
                modalContainer.style.opacity = '1';
            }
        }, 50);
    }
}

// Função para fechar o modal
function closeModalFunc() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        const modalContainer = loginModal.querySelector('.modal-container');
        
        if (modalContainer) {
            // Animar saída
            modalContainer.style.transform = 'translateY(20px)';
            modalContainer.style.opacity = '0';
            
            // Atraso para remover a classe active após a animação
            setTimeout(() => {
                loginModal.classList.remove('active');
                document.body.classList.remove('no-scroll'); // Restaura rolagem do body
            }, 300);
        } else {
            // Fallback se não encontrar o container
            loginModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
}

// Remover handler antigo e adicionar novo
document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.querySelector('.user-icon');
    const loginModal = document.getElementById('loginModal');
    
    // Remover qualquer classe 'active' do modal ao carregar a página
    if (loginModal) {
        loginModal.classList.remove('active');
    }
    
    if (userIcon) {
        userIcon.removeEventListener('click', handleUserClick); // Remove o handler antigo se existir
        userIcon.addEventListener('click', openModal);
    }
    
    // Botão de fechar
    const closeModalBtn = document.querySelector('.modal-close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModalFunc);
    }
    
    // Também fechar o modal ao clicar fora dele
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModalFunc();
            }
        });
    }
    
    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    // Funcionalidade de carrinho de compras
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    // Função para adicionar ao carrinho que pode ser chamada para elementos existentes e dinâmicos
    function setupAddToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            // Verificar se o botão já tem o ouvinte de evento
            if (!button.dataset.hasListener) {
                button.dataset.hasListener = 'true';
                button.addEventListener('click', function() {
                    cartCount++;
                    if (cartCountElement) {
                        cartCountElement.textContent = cartCount;
                    }
                    
                    // Animação de adicionado ao carrinho
                    button.textContent = 'Adicionado ✓';
                    button.style.backgroundColor = '#2ecc71';
                    
                    setTimeout(() => {
                        button.textContent = 'Adicionar ao Carrinho';
                        button.style.backgroundColor = '';
                    }, 1500);
                });
            }
        });
    }
    
    // Configurar botões iniciais
    setupAddToCartButtons();
    
    // Configurar MutationObserver para detectar novos elementos adicionados ao DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setupAddToCartButtons();
            }
        });
    });
    
    // Observar todo o documento para capturar elementos adicionados dinamicamente
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Adicionar ao carrinho na página de detalhes do produto
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantityInput = document.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value) || 1;
            
            cartCount += quantity;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
            
            // Animação de adicionado ao carrinho
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Adicionado ao Carrinho';
            addToCartBtn.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
                addToCartBtn.style.backgroundColor = '';
            }, 1500);
        });
    }
    
    // Comprar agora
    const buyNowBtn = document.querySelector('.buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // Aqui você poderia redirecionar para uma página de checkout
            alert('Redirecionando para o checkout...');
            // window.location.href = 'checkout.html';
        });
    }
    
    // Botão de "Ver Mais" na página inicial
    const seeMoreBtn = document.querySelector('.see-more-btn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    }
    
    // Animação de scroll suave para links internos
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação para a seção Sobre
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(aboutSection);
    }
});

// Botão de email
const emailBtn = document.querySelector('.btn-email');
if (emailBtn) {
    emailBtn.addEventListener('click', function() {
        alert('Login com email em desenvolvimento!');
    });
}

// Configuração do Google OAuth
const googleClientId = '698487548383-bg3b80ihp78kf9k59v6sialr03k2lloj.apps.googleusercontent.com';

function initializeGoogleAuth() {
    // Verificar se o objeto google está disponível
    if (typeof google === 'undefined' || !google.accounts) {
        console.error('Google Identity Services não carregado');
        return;
    }

    google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true
    });

    const googleBtn = document.querySelector('.btn-google');
    if (googleBtn) {
        googleBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Abrir uma mini janela de login do Google
            const width = 500;
            const height = 600;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + 'auth-callback.html')}&response_type=token&scope=email%20profile&prompt=select_account`;
            
            window.open(
                googleAuthUrl,
                'googleLoginPopup',
                `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
            );
            
            // Fechar o modal de login
            closeModalFunc();
        });
    }
    
    // Verificar se voltamos de um fluxo de autenticação OAuth
    window.addEventListener('message', function(event) {
        if (event.origin === window.location.origin && event.data.type === 'googleAuth') {
            handleGoogleResponse(event.data);
        }
    });
}

// Função para lidar com a resposta do Google
function handleGoogleResponse(response) {
    if (response && response.credential) {
        // Obter dados do usuário (pode ser do JWT decodificado ou direto da resposta)
        let userData = response.credential;
        
        if (typeof userData === 'string') {
            // Se for um token JWT, decodificar
            try {
                userData = JSON.parse(atob(userData.split('.')[1]));
            } catch (e) {
                console.error('Erro ao decodificar JWT', e);
                return;
            }
        }
        
        // Atualizar a UI para mostrar que o usuário está logado
        const userIcon = document.querySelector('.user-icon');
        if (userIcon && userData.picture) {
            userIcon.innerHTML = `<img src="${userData.picture}" alt="Foto do usuário" style="width: 32px; height: 32px; border-radius: 50%;">`;
        }
        
        // Salvar informações do usuário no localStorage
        localStorage.setItem('userProfile', JSON.stringify({
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            isLoggedIn: true
        }));
        
        // Opcional: mostrar mensagem de sucesso
        alert(`Bem-vindo, ${userData.name}!`);
        
        // Atualizar interface para mostrar que o usuário está logado
        updateUIForLoggedInUser(userData);
    }
}

// Função para atualizar a interface quando o usuário estiver logado
function updateUIForLoggedInUser(userData) {
    // Implementar conforme necessário para sua interface
    console.log('Usuário logado:', userData);
    
    // Exemplo: mudar texto do ícone de usuário
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.title = `Logado como ${userData.name}`;
    }
}

// Verificar se o usuário já está logado ao carregar a página
function checkUserLoginStatus() {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        try {
            const userData = JSON.parse(userProfile);
            if (userData.isLoggedIn) {
                updateUIForLoggedInUser(userData);
                
                // Atualizar o ícone do usuário com a foto do perfil
                const userIcon = document.querySelector('.user-icon');
                if (userIcon && userData.picture) {
                    userIcon.innerHTML = `<img src="${userData.picture}" alt="Foto do usuário" style="width: 32px; height: 32px; border-radius: 50%;">`;
                }
            }
        } catch (e) {
            console.error('Erro ao processar perfil do usuário', e);
        }
    }
}

// Inicializar a autenticação do Google e verificar status de login ao carregar a página
window.addEventListener('load', function() {
    initializeGoogleAuth();
    checkUserLoginStatus();
});

// Animação da seção Sobre Nós
const aboutContent = document.querySelector('.about-content');
const aboutSection = document.querySelector('.about');
let aboutAnimated = false;

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Verifica se é a seção "Sobre Nós" que está sendo visualizada
            if ((entry.target === aboutSection || entry.target === aboutContent) && !aboutAnimated) {
                setTimeout(() => {
                    aboutContent.classList.add('animate');
                    // Define que a animação já foi executada
                    aboutAnimated = true;
                }, 300);
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-10px'
});

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Paginação e embaralhamento de produtos
document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const prevPage = document.querySelector('.prev-page');
    const nextPage = document.querySelector('.next-page');
    const pageNumber = document.querySelector('.page-number');
    
    if (productGrid && prevPage && nextPage && pageNumber) {
        // Configurando para 9 produtos nas páginas 1 e 2, e 6 na página 3
        const products = Array.from(productGrid.children);
        const totalProducts = products.length;
        let currentPage = 1;
        
        // Função para mostrar produtos baseado na página atual
        function showProducts(page) {
            // Ocultar todos os produtos primeiro
            products.forEach(product => {
                product.style.display = 'none';
            });
            
            // Mostrar os produtos da página atual
            let start, end;
            
            if (page === 1 || page === 2) {
                // 9 produtos para páginas 1 e 2
                start = (page - 1) * 9;
                end = start + 9;
            } else if (page === 3) {
                // 6 produtos para página 3
                start = 18; // após 18 produtos (9+9)
                end = totalProducts;
            }
            
            // Garantir que end não ultrapasse o total de produtos
            if (end > totalProducts) end = totalProducts;
            
            // Mostrar produtos da página atual
            for (let i = start; i < end; i++) {
                if (products[i]) {
                    products[i].style.display = 'flex';
                }
            }
        }

        function updatePaginationControls() {
            pageNumber.textContent = currentPage;
            
            // Configurar botões de paginação
            prevPage.style.display = currentPage === 1 ? 'none' : 'flex';
            
            // Mostrar botão "próxima página" apenas se não estivermos na última página
            // A última página é 3 ou menos dependendo do total de produtos
            const maxPages = Math.ceil(totalProducts / 9);
            nextPage.style.display = currentPage === (totalProducts > 18 ? 3 : maxPages) ? 'none' : 'flex';
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        nextPage.addEventListener('click', function() {
            const maxPages = Math.ceil(totalProducts / 9);
            if (currentPage < (totalProducts > 18 ? 3 : maxPages)) {
                currentPage++;
                showProducts(currentPage);
                updatePaginationControls();
                scrollToTop();
            }
        });

        prevPage.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showProducts(currentPage);
                updatePaginationControls();
                scrollToTop();
            }
        });

        // Inicializar a primeira página
        showProducts(1);
        updatePaginationControls();
    }
});

// Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Impedir rolagem do body quando o menu estiver aberto
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Fechar menu ao clicar no overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        
        // Desativar os ícones de carrinho e usuário
        if (document.querySelector('.cart-icon')) 
            document.querySelector('.cart-icon').classList.remove('active');
        if (document.querySelector('.user-icon')) 
            document.querySelector('.user-icon').classList.remove('active');
        
        document.body.style.overflow = '';
    });
}

// Fechar menu ao clicar em um link do menu - Melhorado
const mobileNavLinks = document.querySelectorAll('.nav-links a, .nav-links li.cart-icon, .nav-links li.user-icon');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Para ícones de usuário e carrinho, tratamento especial
        if (this.classList.contains('cart-icon')) {
            // Comportamento para o carrinho
            console.log('Carrinho clicado');
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Não interromper comportamento padrão
            return;
        } 
        
        if (this.classList.contains('user-icon') || this.id === 'userIcon') {
            // Para o ícone de usuário, permitir que abra o modal de login
            console.log('Usuário clicado');
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Não interromper o comportamento do modal
            return;
        }
        
        // Comportamento para links normais
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        
        // Desativar os ícones de carrinho e usuário
        if (document.querySelector('.cart-icon')) 
            document.querySelector('.cart-icon').classList.remove('active');
        if (document.querySelector('.user-icon')) 
            document.querySelector('.user-icon').classList.remove('active');
        
        document.body.style.overflow = '';
    }
});

// Garantir que o modal de login não apareça automaticamente ao carregar a página
window.addEventListener('load', function() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('active');
        
        // Garantir que o body não fique com overflow hidden
        document.body.style.overflow = '';
    }
}); 