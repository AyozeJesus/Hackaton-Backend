import pandas as pd
import pickle
import sys

historical_data = pd.read_csv('new2.csv')

def predecir_ahorro():
    """
    Función para predecir el ahorro acumulado futuro para un cc_num dado.

    Args:
    cc_num (str): Número de tarjeta de crédito para el cual hacer la predicción.

    Returns:
    float: Predicción del ahorro acumulado futuro.
    """
    data_for_cc_num = historical_data[historical_data['cc_num'] == cc_num]
    # Carga el modelo GARCH desde el archivo pickle
    with open('modelos_arima_ahorro.pkl.', 'rb') as f:
        loaded_model = pickle.load(f)

    # Realiza la predicción de la volatilidad
    predicciones = loaded_model.forecast(horizon=6)
    predicted_variance = predicciones.variance[-1:].round(2)  # Obtener la última fila de varianzas y redondear
    predicted_mean = predicciones.mean[-1:].round(2)  # Obtener la última fila de medias y redondear

    # Devuelve un DataFrame con las predicciones de medias y varianzas
    return {"predicted_mean": predicted_mean, "predicted_variance": predicted_variance}

# Ejemplo de uso
try:
    cc_num = '30270432095985'
    ahorro_predicho = predecir_ahorro()
    print(f"Ahorro acumulado predicho para el cc_num {cc_num}: {ahorro_predicho}")
except Exception as e:
    print(f"Error: {e}")