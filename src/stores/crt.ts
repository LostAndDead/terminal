import { writable } from 'svelte/store';

export const crtEnabled = writable<boolean>(
  JSON.parse(localStorage.getItem('crtEnabled') || 'true')
);

crtEnabled.subscribe((value) => {
  localStorage.setItem('crtEnabled', JSON.stringify(value));
});