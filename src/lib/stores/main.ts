import { writable } from 'svelte/store';

export const accordion = writable<number | null>(1);

export const searchStore = writable('');

export const searchModal = writable(false);

export const inputTarget = writable();

export const sidebar = writable(false);
