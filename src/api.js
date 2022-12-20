// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
    mode: 'cors',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.originalStatus > 400) {
        //console.log(result)
        // send refresh token to get new access token
        // api.dispatch(setCredentials({email: null}))
    }
    return result
}


export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Contacts', 'Profile'],
    endpoints: builder => ({
        // User API
        login: builder.mutation({
            query: () => ({
                url: `users/login/google`,
                method: "GET",
            }),
        }),
        getUser: builder.mutation({
            query: ({email}) => ({
                url: `users/api/users/email/${email}`,
                method: "GET",
            }),
        }),
        getUser2: builder.query({
            query: ({email}) => `users/api/users/email/${email}`,
            providesTags: ['Profile']
        }),
        createUser: builder.mutation({
            query: ({email}) => ({
                url: `users/api/users/create/${email}`,
                method: "POST",
            }),
        }),
        updateUser: builder.mutation({
            query: ({email, lastName, firstName, middleName, username}) => ({
                url: `users/api/users/update/${email}/${lastName}/${firstName}/${middleName}/${username}`,
                method: "POST",
            }),
            invalidatesTags: ['Profile']
        }),

        // Restaurant API
        getAllRestaurants: builder.mutation({
            query: ({offset, limit}) => ({
                url: `restaurants/api/restaurants/all/${offset}/${limit}`,
                method: "GET"
            }),
        }),
        getRestaurants: builder.mutation({
            query: ({query, offset, limit}) => ({
                // url: `restaurants/api/restaurants/query/${query}/${offset}/${limit}`,
                url: `restaurants/api/restaurants/query/query?query=${query}&offset=${offset}&limit=${limit}`,
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
            providesTags: ['Contacts']
        }),
        createContact:builder.mutation({
            query: ({uid, type, contact, kind}) => ({
                url: `contacts/api/contacts/create/${uid}/${type}/${contact}/${kind}`,
                method: "POST",
            }),
            invalidatesTags: ["Contacts"]
        }),
        updateContact:builder.mutation({
            query: ({uid, type, contact, kind}) => ({
                url: `contacts/api/contacts/update/${uid}/${type}/${contact}/${kind}`,
                method: "PUT"
            }),
            invalidatesTags: ["Contacts"]
        }),
        deleteContact:builder.mutation({
            query: ({uid, type, kind}) => ({
                url: `contacts/api/contacts/delete/${uid}/${type}/${kind}`,
                method: "DELETE"
            })
        }),

        // Composite API
        // updateUser: builder.mutation({
        //     query: ({email, lastName, firstName, middleName, username}) => ({
        //         url: `composite/api/composite/update/${email}/${lastName}/${firstName}/${middleName}/${username}`,
        //         method: "POST"
        //     }),
        // }),
        createUserComposite:builder.mutation( {
            query:({email, lastName, firstName, middleName, username, type, contact, kind}) => ({
                url: `composite/api/composite/create/${email}/${lastName}/${firstName}/${middleName}/${username}
                ?contact={"type":"${type}","contact":"${contact}","kind":"${kind}"`,
                method: "POST"
            })
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

        // Reviews API
        getReviewsByRestaurant: builder.query({
            query: ({rid}) => `reviews/api/reviews/id/${rid}`,
        }),
        createReview: builder.mutation({
            query: ({rid, uid, rating, content}) => ({
                url: `reviews/api/reviews/createall/${rid}/${uid}/${rating}/${content}`,
                method: "POST"
            }),
        })
    })
})

// Export the auto-generated hook for the endpoint
// const [modify,{isLoading,isFetching,error}] = useModifyMutation()
// const {data, isFetching} = useGetQuery()
export const {
    useLoginMutation,
    useGetUserMutation,
    useGetUser2Query,
    useUpdateUserMutation,

    useGetAllRestaurantsMutation,
    useGetRestaurantsMutation,
    useGetRestaurantByIDQuery,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,

    useGetContactQuery,
    useCreateContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,

    useDeleteUserMutation,
    useCreateUserCompositeMutation,

    useCreateReviewMutation
} = api
