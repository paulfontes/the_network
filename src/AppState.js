import { reactive } from 'vue'
import { Profile } from './models/Profile.js'
import { Account } from './models/Account.js'
import { Post } from './models/Post.js'
import { Ad } from './models/Ad.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Post.js').Post[]} user info from the database*/
  posts: [],

  currentPage: 0,

  totalPages: 0,

  searchTerm: '',

  /**@type {Profile} */
  activeProfile: null,

  /**@type {Post[]} */
  profilePosts: [],

  /**@type {Ad[]} */
  ads: []


})

