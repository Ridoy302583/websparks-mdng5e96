import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase';

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export interface Subscriber {
  id?: string;
  email: string;
  subscribed_at?: string;
  source?: string;
  status?: 'active' | 'unsubscribed';
}

export const subscribeEmail = async (email: string, source: string = 'email'): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('subscribers')
      .select('id, status')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return { success: false, error: 'This email is already subscribed to our newsletter.' };
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('subscribers')
          .update({ status: 'active', subscribed_at: new Date().toISOString() })
          .eq('id', existingSubscriber.id);

        if (updateError) throw updateError;
        return { success: true };
      }
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          source,
          status: 'active',
          subscribed_at: new Date().toISOString()
        }
      ]);

    if (insertError) throw insertError;

    return { success: true };
  } catch (error: any) {
    console.error('Error subscribing email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to subscribe. Please try again.' 
    };
  }
};
