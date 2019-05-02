const dev = {
    API_URL : 'https://localhost:4443/api'
};

const prod = {
    API_URL : 'https://localhost:4443/api'
};

// Default to dev if not set
export const config = process.env.NODE_ENV === 'prod'
? prod
: dev;
