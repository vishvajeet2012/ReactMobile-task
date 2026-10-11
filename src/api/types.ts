export interface RegisterRequest {
  phone: string;
  dial_code?: string;
}

export interface RegisterResponse {
  status: string;
  status_code: number;
  data: string;
}

export interface LoginRequest {
  phone: string;
  otp: string;
  dial_code?: string;
}

export interface UserLocation {
  id?: number;
  address?: string;
  pincode?: string;
  city_name?: string;
  is_default?: boolean;
}

export interface UserProfile {
  user_id: string;
  user_name: string;
  user_gender?: string;
  user_email?: string;
  dial_code: string;
  user_mobile: string;
  member_since?: string;
  email_verified?: boolean;
  mobile_verified?: boolean;
  user_source?: string;
  user_image?: string;
  first_order?: boolean;
  refer_code?: string;
  token: string;
  is_b2b?: boolean;
  is_new_user?: boolean;
  last_known_location?: UserLocation[];
}

export interface LoginResponse {
  status: string;
  status_code: number;
  data: UserProfile;
}

export interface Restaurant {
  restaurant_id: string;
  restaurant_name: string;
  address_complete: string;
  logo: string;
}

export interface RestaurantResponse {
  status: string;
  status_code: number;
  data: {
    results: Restaurant[];
    meta: {
      total_pages: number;
      total_count: number;
    };
  };
}
