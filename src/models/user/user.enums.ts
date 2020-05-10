export enum UserRoles {
    USER = 'user',
    ADMIN = 'admin'
}

export enum UserVirtuals {
    REVIEWS = 'reviews',
    REVIEWS_COUNT = 'reviewsCount',

    EXCERPTS = 'excerpts',
    EXCERPTS_COUNT = 'excerptsCount',

    FOLLOWED_BOOKS = 'followedBooks',
    FOLLOWED_BOOKS_COUNT = 'followedBooksCount',

    RATED_BOOKS = 'ratedBooks',
    RATED_BOOKS_COUNT = 'ratedBooksCount',

    FOLLOWERS = 'followers',
    FOLLOWERS_COUNT = 'followersCount',

    FOLLOWING = 'following',
    FOLLOWING_COUNT = 'followingCount',

    FAVORITE_AUTHORS = "favoriteAuthors",
    FAVORITE_AUTHORS_COUNT = "favoriteAuthorsCount",

    FAVORITE_BOOKS = "favoriteBooks",
    FAVORITE_BOOKS_COUNT = "favoriteBooksCount",

    PROFILE = 'profile'
}