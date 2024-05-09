import pandas as pd
import sys

def calcular_suma_acumulada(cc_num):

    """
    Función para calcular la suma acumulada de un cc_num dado.

    Args:
    cc_num (int): Número de tarjeta de crédito para el cual calcular la suma acumulada.

    Returns:
    float: Suma acumulada del cc_num dado.
    """
    # Carga los datos históricos desde un archivo CSV
    historical_data = pd.read_csv('src/infrastructure/API/Controllers/MachineLearning/new2.csv')

    # Filtra los datos históricos para el cc_num dado y la categoría "Salary"
    data_for_cc_num = historical_data[(historical_data['cc_num'] == cc_num) & (historical_data['category'] == 'Salary')]

    # Calcula la suma acumulada de los ingresos para la categoría "Salary"
    suma_acumulada = data_for_cc_num['amount'].sum()

    return suma_acumulada

# Ejemplo de uso
try:

    cc_num = int(sys.argv[1])
    suma_acumulada = calcular_suma_acumulada(cc_num)
    print(f"La suma acumulada para el cc_num {cc_num} es: {suma_acumulada}")
except Exception as e:
    print(f"Error: {e}")