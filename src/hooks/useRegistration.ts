import { useState } from 'react';
import { supabase } from '../supabase/supabase';
import type { RegistrationData, RegistrationResponse } from '../types/Registration';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadScreenshot = async (file: File, eventId: string): Promise<{ url: string; filePath: string } | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `screenshots/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('registration-screenshots')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('registration-screenshots')
        .getPublicUrl(filePath);

      return { url: publicUrl, filePath };
    } catch (err) {
      console.error('Screenshot upload error:', err);
      return null;
    }
  };

  const deleteScreenshot = async (filePath: string): Promise<void> => {
    try {
      const { error } = await supabase.storage
        .from('registration-screenshots')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting screenshot:', error);
      } else {
        console.log('Screenshot deleted successfully:', filePath);
      }
    } catch (err) {
      console.error('Screenshot deletion error:', err);
    }
  };

  const mapFormDataToTable = (data: RegistrationData, screenshotUrl: string) => {
    const baseData: any = {
      leader_name: data.leaderName,
      leader_phone: data.leaderPhone,
      screenshot_url: screenshotUrl,
    };

    // Add email if present
    if (data.email) {
      baseData.email = data.email;
    }

    // Add college if present (for business-pitching)
    if (data.college) {
      baseData.college = data.college;
    }

    // Map members to appropriate fields based on event
    data.members.forEach((member, index) => {
      if (member.name) {
        if (data.eventId === 'business-pitching') {
          // Business pitching uses member2, member3, member4
          const memberNum = index + 2;
          baseData[`member${memberNum}_name`] = member.name;
          baseData[`member${memberNum}_phone`] = member.phone;
        } else {
          // Other events use member1, member2, member3
          const memberNum = index + 1;
          baseData[`member${memberNum}_name`] = member.name;
          baseData[`member${memberNum}_phone`] = member.phone;
        }
      }
    });

    return baseData;
  };

  const register = async (data: RegistrationData): Promise<RegistrationResponse> => {
    setLoading(true);
    setError(null);
    let uploadedFilePath: string | null = null;

    try {
      // Upload screenshot first
      const uploadResult = await uploadScreenshot(data.screenshotFile, data.eventId);
      
      if (!uploadResult) {
        throw new Error('Failed to upload screenshot. Please try again.');
      }

      uploadedFilePath = uploadResult.filePath;
      const screenshotUrl = uploadResult.url;

      // Map form data to database structure
      const tableData = mapFormDataToTable(data, screenshotUrl);

      // Insert into the appropriate table
      const { data: insertData, error: insertError } = await supabase
        .from(data.eventId)
        .insert([tableData])
        .select();

      if (insertError) {
        // Delete the uploaded screenshot since registration failed
        if (uploadedFilePath) {
          await deleteScreenshot(uploadedFilePath);
        }
        throw new Error(insertError.message);
      }

      setLoading(false);
      return {
        success: true,
        data: insertData,
      };
    } catch (err: any) {
      // Clean up uploaded screenshot on any error
      if (uploadedFilePath) {
        await deleteScreenshot(uploadedFilePath);
      }
      
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      setLoading(false);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  return {
    register,
    loading,
    error,
  };
};
