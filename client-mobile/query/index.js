import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query Movies {
    movies {
      id
      authorId
      title
      genreId
      synopsis
      imgUrl
      trailerUrl
      rating
    }
  }
`;

export const GET_GENRES = gql`
  query Genres {
    genres {
      id
      name
    }
  }
`;

export const GET_MOVIES_DETAIL = gql`
  query DetailMovie($detailMovieId: Int) {
    detailMovie(id: $detailMovieId) {
      id
      authorId
      title
      genreId
      synopsis
      imgUrl
      trailerUrl
      rating
      Genre {
        id
        name
      }
      Author {
        _id
        username
        email
        phoneNumber
        address
      }
      Casts {
        id
        movieId
        name
        profilePict
      }
    }
  }
`;
