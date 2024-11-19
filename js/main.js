class App {
    constructor() {
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        if (!localStorage.getItem('token')) {
            this.showLoginModal();
        }
        this.bindEvents();
    }

    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        try {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                alert('请输入用户名和密码');
                return;
            }

            const response = await API.login(username, password);
            
            if (response && response.success) {
                localStorage.setItem('token', response.token);
                this.isAuthenticated = true;
                this.hideLoginModal();
            }
        } catch (error) {
            console.error('登录错误:', error);
            alert('登录失败，请重试');
        }
    }

    bindEvents() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => this.handleLogin(e));
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
}); 