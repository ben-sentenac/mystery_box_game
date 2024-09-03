import { loginHandler, registerHandler, getProfileHandler } from "./auth.handler.js";
const registerOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['username', 'email', 'password']
        },
        response: {
            "201": {
                type: 'object',
                properties: {
                    status: {
                        type: 'string'
                    },
                    data: {
                        type: 'object'
                    }
                }
            }
        }
    }
};
const loginOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            },
            required: ['email', 'password']
        },
        response: {
            "200": {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                    },
                    token: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
const showProfileOptions = {
    schema: {
        response: {
            "200": {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                    },
                    data: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string'
                            }, username: {
                                type: 'string'
                            },
                            email: {
                                type: 'string'
                            },
                            points: {
                                type: 'number'
                            }
                        },
                    },
                }
            }
        }
    }
};
export async function AuthRoutes(_instance) {
    _instance.post('/register', registerOpts, registerHandler);
    _instance.post('/login', loginOpts, loginHandler);
    _instance.get('/:id', showProfileOptions, getProfileHandler);
}
//# sourceMappingURL=auth.routes.js.map