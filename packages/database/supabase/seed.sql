-- Local development seed data.
-- Recreates a deterministic test user for auth flows.

do $$
declare
  seed_user_id uuid := '11111111-1111-1111-1111-111111111111';
begin
  delete from public.receipts
  where user_id = seed_user_id;

  delete from auth.identities
  where user_id = seed_user_id
     or identity_data ->> 'email' = 'sam@snapdish.com';

  delete from auth.users
  where id = seed_user_id
     or email = 'sam@snapdish.com';

  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_sent_at,
    recovery_sent_at,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    email_change,
    email_change_token_new,
    recovery_token,
    confirmation_token
  )
  values (
    seed_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'sam@snapdish.com',
    crypt('password-sam', gen_salt('bf')),
    now(),
    null,
    null,
    null,
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    now(),
    now(),
    null,
    null,
    '',
    '',
    '',
    '',
    '',
    ''
  );

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    seed_user_id,
    seed_user_id,
    jsonb_build_object(
      'sub', seed_user_id::text,
      'email', 'sam@snapdish.com',
      'email_verified', true
    ),
    'email',
    'sam@snapdish.com',
    now(),
    now(),
    now()
  );

  insert into public.receipts (
    id,
    user_id,
    storage_path,
    original_filename,
    content_type,
    size_bytes,
    created_at
  )
  values (
    '22222222-2222-2222-2222-222222222222',
    seed_user_id,
    '11111111-1111-1111-1111-111111111111/2026-04-11-weekly-shop.jpg',
    'weekly-shop.jpg',
    'image/jpeg',
    245678,
    now()
  );
end $$;
