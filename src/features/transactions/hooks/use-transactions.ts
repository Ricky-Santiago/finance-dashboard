import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { type Transaction, type TransactionForm } from "../data/schema";
import { type Category } from "@/features/categories/data/schema";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const [{ data: txData }, { data: catData }] = await Promise.all([
      supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]);

    if (txData) setTransactions(txData);
    if (catData) setCategories(catData);
    setIsLoading(false);
  };

  const addTransaction = async (data: TransactionForm) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: newTx, error } = await supabase
      .from("transactions")
      .insert({
        ...data,
        amount: parseFloat(data.amount),
        user_id: user.id,
      })
      .select()
      .single();

    if (!error && newTx) {
      setTransactions((prev) => [newTx, ...prev]);
    }
  };
  const updateTransaction = async (id: string, data: TransactionForm) => {
  const { data: updated, error } = await supabase
    .from('transactions')
    .update({ ...data, amount: parseFloat(data.amount) })
    .eq('id', id)
    .select()
    .single()

  if (!error && updated) {
    setTransactions(prev => prev.map(t => t.id === id ? updated : t))
  }
}

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (!error) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    transactions,
    categories,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
