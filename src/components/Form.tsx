import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { categories } from '../data/categories'
import { FormT } from '../types/type'
import { useActivity } from '../hooks/useActivity'


const initialState: FormT = {
    id: uuidv4(),
    category: 1,
    activity: '',
    calories: 0
}

export const Form = () => {
    const { state, dispatch } = useActivity()
    const [formState, setFormState] = useState<FormT>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selected = state.activities.filter(item => item.id === state.activeId)[0]
            setFormState(selected)
        }
    }, [state.activeId])

    
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id) 
        setFormState({
            ...formState,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value 
        })
    }

    const isValid = () => {
        const { activity, calories } = formState
        return activity.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        //para prevenir la accion por default
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: formState } })
        setFormState({ ...initialState, id: uuidv4() })
    }

    return (
        <form
            className=" space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className=" grid grid-cols-1 gap-3">
                <label htmlFor="category"> Categoría:</label>
                <select
                    className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={formState.category}
                    onChange={e => handleChange(e)}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className=" grid grid-cols-1 gap-3">
                <label htmlFor="activity" className=' font-bold'> Actividad:</label>
                <input
                    id="activity"
                    type="text"
                    className='border border-slate-300 p-2 rounded-lg'
                    placeholder='Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta'
                    value={formState.activity}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className=" grid grid-cols-1 gap-3">
                <label htmlFor="calories" className=' font-bold'> Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className='border border-slate-300 p-2 rounded-lg'
                    placeholder='Calorias ej. 300 o 500'
                    value={formState.calories}
                    onChange={e => handleChange(e)}
                />
            </div>
            <input
                type="submit"
                className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
                value={formState.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValid()}
            />
        </form>
    )
}
