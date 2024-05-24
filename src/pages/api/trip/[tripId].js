import { createHash } from "node:crypto"
import { db, UserTrip, Trip, NOW } from "astro:db"
import { getSession } from "auth-astro/server"
import { date } from "astro/zod"

//POST  api/trip/[tripId]
// JSON 

const generateID = (str) => {
    return createHash('sha256').update(str).digest('hex')
}

export const POST = async ({ params, request }) => {
    const session = await getSession(request)
    const { tripId } = params


    if (!session || !session.user == null) {
        return new Response('Unauthorized', { status: 401 })
    }

    const { name } = await request.json()


    const userId = generateID(session.user.email)
    const tripAt = NOW

    const userTripId = `${userId}-${tripId}`

    const trip = { id: tripId, name, tripAt }
    const userTrip = { id: userTripId, userId, tripId }

    console.log(Trip)
    db.insert(Trip).values(trip)
    db.insert(UserTrip).values(userTrip)

    return new Response('POST tripId: ', { status: 200 })
}