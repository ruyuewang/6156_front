// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
        headers.set('Access-Control-Allow-Credentials', 'true')
        return headers
    },
})


export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['Places', "User", "Cars"],
    endpoints: builder => ({
        // User API
        login: builder.mutation({
            query: () => ({
                url: `users/login/google`,
                method: "GET",
            }),
        }),
        // updateUser: builder.mutation({
        //     query: ({email, lastName, firstName, middleName, username}) => ({
        //         url: `users/api/users/update/${email}/${lastName}/${firstName}/${middleName}/${username}`,
        //         method: "POST"
        //     }),
        // }),
        // deleteUser: builder.mutation({
        //     query: ({email}) => ({
        //         url: `users/api/users/delete/${email}`,
        //         method: "POST"
        //     }),
        // }),
        getUser: builder.query({
            query: ({email}) => `users/api/users/email/${email}`
        }),

        // Restaurant API
        getAllRestaurants: builder.query({
            query: () => "restaurants/api/restaurants/all",
        }),
        getRestaurants: builder.mutation({
            query: ({query, offset, limit}) => ({
                url: `restaurants/api/restaurants/query/${query}/${offset}/${limit}`,
                method: "GET"
            }),
        }),
        getRestaurantByID: builder.query({
            query: ({rid}) => `restaurants/api/restaurants/id/${rid}`,
        }),

        updateRestaurant: builder.mutation({
            query: ({rid, cuisine, name, rating, address, phone}) => ({
                url: `restaurants/api/restaurants/update/${rid}/${cuisine}/${name}/${rating}/${address}/${phone}`,
                method: "POST"
            })
        }),
        deleteRestaurant: builder.mutation({
            query: ({rid}) => ({
                url: `restaurants/api/restaurants/delete/${rid}`,
                method: "POST"
            })
        }),

        // Contact API
        getContact: builder.query({
            query: ({uid}) => `contacts/api/contacts/id/${uid}`,
        }),
        createContact:builder.mutation({
            query: ({uid, type, contact, kind}) => ({
                url: `contacts/api/contacts/create/${uid}/${type}/${contact}/${kind}`,
                method: "POST"
            })
        }),
        updateContact:builder.mutation({
            query: ({uid, type, contact, kind}) => ({
                url: `contacts/api/contacts/update/${uid}/${type}/${contact}/${kind}`,
                method: "PUT"
            })
        }),
        deleteContact:builder.mutation({
            query: ({uid, type, kind}) => ({
                url: `contacts/api/contacts/delete/${uid}/${type}/${kind}`,
                method: "DELETE"
            })
        }),

        // Composite API
        updateUser: builder.mutation({
            query: ({email, lastName, firstName, middleName, username}) => ({
                url: `composite/api/composite/update/${email}/${lastName}/${firstName}/${middleName}/${username}`,
                method: "POST"
            }),
        }),
        deleteUser: builder.mutation({
            query: ({email}) => ({
                url: `composite/api/composite/delete/${email}`,
                method: "POST"
            }),
        }),
        getUserByEmail: builder.query({
            query: ({email}) => `composite/api/composite/email/${email}`,
        }),

    })
})

// Export the auto-generated hook for the endpoint
// const [modify,{isLoading,isFetching,error}] = useModifyMutation()
// const {data, isFetching} = useGetQuery()
export const {
    useLoginMutation,
    useGetUserQuery,

    useGetAllRestaurantsQuery,
    useGetRestaurantsMutation,
    useGetRestaurantByIDQuery,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,

    useGetContactQuery,
    useCreateContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,

    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByEmailQuery
} = api
