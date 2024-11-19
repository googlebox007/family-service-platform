// API 配置和请求处理
const API_BASE_URL = 'https://api.example.com';

class API {
    static async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...defaultOptions,
                ...options
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static DEFAULT_CREDENTIALS = {
        username: 'admin',
        password: '123456'
    };

    static async login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === this.DEFAULT_CREDENTIALS.username && 
                    password === this.DEFAULT_CREDENTIALS.password) {
                    
                    resolve({
                        success: true,
                        token: btoa(`${username}:${new Date().getTime()}`),
                        user: {
                            username: username,
                            role: 'admin',
                            lastLogin: new Date().toISOString()
                        }
                    });
                } else {
                    reject(new Error('用户名或密码错误'));
                }
            }, 500);
        });
    }

    static async getArchives() {
        // 模拟档案数据
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: [
                        {
                            id: 1,
                            name: '张家庭',
                            type: '特殊家庭',
                            address: '某某街道',
                            phone: '13800138000',
                            createTime: '2024-01-01'
                        },
                        {
                            id: 2,
                            name: '李家庭',
                            type: '特殊家庭',
                            address: '某某社区',
                            phone: '13900139000',
                            createTime: '2024-01-02'
                        }
                        // 可以添加更多模拟数据
                    ]
                });
            }, 500);
        });
    }

    static async getTasks() {
        return await this.request('/tasks');
    }
}

// 添加到全局作用域
window.API = API; 