/**
 * Optimized data fetching for home page
 * Fetches all data in parallel for better performance
 */

import { payload } from './payload'

export interface HomePageData {
  services: Awaited<ReturnType<typeof payload.getServices>>
  testimonials: Awaited<ReturnType<typeof payload.getTestimonials>>
  team: Awaited<ReturnType<typeof payload.getTeam>>
  blogs: Awaited<ReturnType<typeof payload.getBlogs>>
}

/**
 * Fetch all home page data in parallel
 * This is much faster than sequential fetching
 */
export async function fetchHomePageData(): Promise<HomePageData> {
  // Fetch all data in parallel using Promise.all
  const [services, testimonials, team, blogs] = await Promise.all([
    payload.getServices({ limit: 10 }),
    payload.getTestimonials({ limit: 10 }),
    payload.getTeam({ limit: 10 }),
    payload.getBlogs({ limit: 3 }),
  ])

  return {
    services,
    testimonials,
    team,
    blogs,
  }
}

