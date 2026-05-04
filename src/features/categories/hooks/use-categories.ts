import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { type Category } from '../data/schema'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (data) setCategories(data)
    setIsLoading(false)
  }

  const addCategory = async (name: string, color: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('categories')
      .insert({ name, color, user_id: user.id })
      .select()
      .single()

    if (!error && data) {
      setCategories(prev => [...prev, data])
    }
  }

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (!error) {
      setCategories(prev => prev.filter(c => c.id !== id))
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, isLoading, addCategory, deleteCategory }
}