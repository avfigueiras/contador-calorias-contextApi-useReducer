import { useMemo } from "react"
import { FormT } from "../types/type"
import { CustomCalorieDisplay } from "./CustomCalorieDisplay"
import { useActivity } from "../hooks/useActivity"


export const CaloryTracker = () => {
    const {state} = useActivity()
    // calorias consumidas
    const caloriesConsummed = useMemo(() => state.activities.reduce((total: number, currentActivity: FormT) => currentActivity.category === 1 ? total + currentActivity.calories : total, 0), [state.activities])

    //calorias quemadas
    const caloriesBurned = useMemo(() => state.activities.reduce((total: number, currentActivity: FormT) => currentActivity.category === 2 ? total + currentActivity.calories : total, 0), [state.activities])

    //calorias resultado de la resta de las ingeridas - las quemadas
    const netCalories = useMemo(() => caloriesConsummed - caloriesBurned, [state.activities])


    return (
        <div>
            <p className="text-white text-center font-black text-4xl">Resumen de Calorias</p>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CustomCalorieDisplay totals={caloriesConsummed} text='Consumidas' />
                <CustomCalorieDisplay totals={caloriesBurned} text='Quemadas' />
                <CustomCalorieDisplay totals={netCalories} text='Diferencia' />
            </div>
        </div>
    )
}
