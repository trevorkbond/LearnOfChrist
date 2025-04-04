"use client";

import { createClient } from "@/utils/supabase/client";
import { CheckSquare, Square } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  reference_id: number;
}

async function getIsRead(reference_id: number): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_reference")
    .select("reference_id")
    .eq("reference_id", reference_id);

  if (error) throw error;
  return data.length > 0;
}

async function markIsRead(reference_id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_reference")
    .insert({ reference_id: reference_id });
  if (error) throw error;
}

async function markNotIsRead(reference_id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_reference")
    .delete()
    .eq("reference_id", reference_id);
  if (error) throw error;
}

export default function Checkbox(props: Props) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const fetchIsRead = async () => {
      try {
        const result = await getIsRead(props.reference_id);
        setIsRead(result);
      } catch (error) {
        console.error("Error fetching isRead:", error);
      }
    };
    fetchIsRead();
  }, [props.reference_id]);

  const handleMarkAsRead = async () => {
    try {
      await markIsRead(props.reference_id);
      setIsRead(true);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAsNotRead = async () => {
    try {
      await markNotIsRead(props.reference_id);
      setIsRead(false);
    } catch (error) {
      console.error("Error marking as not read:", error);
    }
  };

  return (
    <div className="py-5">
      {isRead ? (
        <CheckSquare onClick={handleMarkAsNotRead} />
      ) : (
        <Square onClick={handleMarkAsRead} />
      )}
    </div>
  );
}
