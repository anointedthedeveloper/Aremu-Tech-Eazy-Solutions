import { GridFSBucket, MongoClient, type Collection, type Db, type Document, type ObjectId } from 'mongodb'

export interface UserDoc {
  _id?: ObjectId
  email: string
  name: string
  role: 'applicant'
  passwordHash: string
  mustChangePassword: boolean
  createdAt: Date
}

export type ApplicationStatus = 'new' | 'reviewing' | 'accepted' | 'waitlisted' | 'rejected'
export const APPLICATION_STATUSES: ApplicationStatus[] = ['new', 'reviewing', 'accepted', 'waitlisted', 'rejected']

export interface StoredFile {
  label: string
  fileId: ObjectId
  name: string
  size: number
  type: string
}

export interface ApplicationDoc {
  _id?: ObjectId
  userId: ObjectId
  email: string
  name: string
  mode: string
  fields: Record<string, string>
  files: StoredFile[]
  status: ApplicationStatus
  /** Message from the admin that the applicant can see. */
  adminNote: string
  createdAt: Date
  updatedAt: Date
}

export interface EnquiryDoc {
  _id?: ObjectId
  name: string
  phone: string
  email: string
  service: string
  organisation: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: Date
}

interface Cached {
  client: MongoClient
  db: Db
}

const g = globalThis as unknown as { __mongo?: Promise<Cached>; __indexes?: boolean }

async function connect(): Promise<Cached> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')
  const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 })
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || 'aremutech')
  return { client, db }
}

export async function getDb(): Promise<Db> {
  g.__mongo ??= connect().catch((e) => {
    g.__mongo = undefined
    throw e
  })
  const { db } = await g.__mongo
  if (!g.__indexes) {
    g.__indexes = true
    await Promise.all([
      db.collection('users').createIndex({ email: 1 }, { unique: true }),
      db.collection('applications').createIndex({ createdAt: -1 }),
      db.collection('applications').createIndex({ userId: 1 }),
      db.collection('enquiries').createIndex({ createdAt: -1 }),
      db.collection('rateLimits').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]).catch(() => {
      g.__indexes = false
    })
  }
  return db
}

export async function col<T extends Document>(name: 'users' | 'applications' | 'enquiries' | 'rateLimits'): Promise<Collection<T>> {
  return (await getDb()).collection<T>(name)
}

export async function bucket() {
  return new GridFSBucket(await getDb(), { bucketName: 'uploads' })
}
