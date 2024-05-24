import { column, defineDb, defineTable } from 'astro:db';

// Define your database schema here.
const Trip = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    tripAt: column.date(),
  }
}
)
const UserTrip = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text(),
    tripId: column.text(),
  },
  foreignKeys: [
    {
      columns: ['tripId'],
      references: () => [Trip.columns.id],
    }
  ]
})



const Bill = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    tripId: column.text(),
    amount: column.number(),
    paidBy: column.text(),
    splitBy: column.text(),
    createdAt: column.date(),
  }
}
)
const TripBills = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    tripId: column.text(),
    billId: column.text(),
  },
  foreignKeys: [
    {
      columns: ['tripId', 'billId'],
      references: () => [Trip.columns.id, Bill.columns.id],
    }
  ]

})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Trip,
    UserTrip,
    Bill,
    TripBills
  },
});
