import Joi from "joi"


export enum USERGENREENUM {
    ACTION = "Action",
    COMEDY = "Comedy",
    DRAMA = "Drama",
    HORROR = "Horror",
    ROMANCE = "Romance",
    THRILLER = "Thriller"
}

export const AddUserSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    preferences: Joi.object({
      favoriteGenres: Joi.array().items(Joi.string().valid('Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller')).optional(),
      dislikedGenres: Joi.array().items(Joi.string()).optional()
    }).optional(),
    watchHistory: Joi.array().optional(),
    myList: Joi.array().optional(),
  }).unknown(true).options({ abortEarly: false });


export const AddMyListSchema = Joi.object({
    userId: Joi.string().guid().required(),
    itemId: Joi.string().guid().required(),
    itemType: Joi.string().valid('movie', 'tvshow').required()
});

export const RemoveFromListSchema = Joi.object({
    userId: Joi.string().guid().required(),
    itemId: Joi.string().guid().required(),
});


// export const AddToListSchema = Joi.object({
// id: Joi.string().required(),
// username: Joi.string().required(),
// preferences: Joi.object({
//     favoriteGenres: Joi.array().items(Joi.string().valid('Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller')).optional(),
//     dislikedGenres: Joi.array().items(Joi.string()).optional()
// }).optional(),
// watchHistory: Joi.array().optional(),
// myList: Joi.array().optional(),
// }).unknown(true).options({ abortEarly: false });


