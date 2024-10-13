const endPoints = {

    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
    },

    user: {
        preferences: {
            get: '/user/preferences',
            set: '/user/preferences',
        },
    },

    news: {
        siteData: '/news/site-data',
        newsWithFilters: '/news/search',
        myFeed: '/news/user-newsfeed',
    }

}

export default endPoints;