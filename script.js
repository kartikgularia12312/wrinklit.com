const form = document.querySelector('#notify-form');
const email = document.querySelector('#email');
const popup = document.querySelector('#popup');
const close = document.querySelector('.popup-close');
const supabase = window.WRINKLIT_SUPABASE || {};

function showPopup() { popup.classList.add('show'); popup.setAttribute('aria-hidden', 'false'); }
function hidePopup() { popup.classList.remove('show'); popup.setAttribute('aria-hidden', 'true'); }

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!email.validity.valid) return email.reportValidity();
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'One moment…';
  try {
    if (!supabase.url || !supabase.anonKey) throw new Error('Supabase is not configured');
    const response = await fetch(`${supabase.url}/rest/v1/waitlist_subscribers?on_conflict=email`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        apikey:supabase.anonKey,
        Authorization:`Bearer ${supabase.anonKey}`,
        Prefer:'return=minimal,resolution=ignore-duplicates'
      },
      body:JSON.stringify({email:email.value.trim()})
    });
    if (!response.ok) throw new Error('Subscription could not be saved');
    email.value = '';
    showPopup();
  } catch (error) { button.textContent = 'Try again'; button.disabled = false; return; }
  button.textContent = 'Notify me ↗';
  button.disabled = false;
});
close.addEventListener('click', hidePopup);
