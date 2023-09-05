import { writable } from "svelte/store"

export const accordion = writable<number | null>(1)

export const searchModal = writable(false)
