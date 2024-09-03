export const registerRouteOpts = {
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
export const loginRouteOpts = {
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
export const showProfileRouteOpts = {
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

