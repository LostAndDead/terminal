import { writable } from 'svelte/store';

export const soundEnabled = writable<boolean>(
  JSON.parse(localStorage.getItem('soundEnabled') || 'true')
);

soundEnabled.subscribe((value) => {
  localStorage.setItem('soundEnabled', JSON.stringify(value));
});