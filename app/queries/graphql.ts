import { gql } from "@apollo/client"

export const SEARCH_COORD = gql`
    query Search ($term: String!, $latitude: Float!, $longitude: Float!, $categories: String!) {
        search(term: $term, latitude: $latitude, longitude: $longitude, categories: $categories, limit: 10) {
            business {
                name
                display_phone
                location {
                  formatted_address
                }
                coordinates {
                  latitude
                  longitude
                }
                rating
            }
        }
    }
  `

export const SEARCH_ADDR = gql`
    query Search ($term: String!, $location: String!, $categories: String!) {
        search(term: $term, location: $location, categories: $categories, limit: 10) {
            business {
                name
                display_phone
                location {
                  formatted_address
                }
                coordinates {
                  latitude
                  longitude
                }
                rating
            }
        }
    }
  `
