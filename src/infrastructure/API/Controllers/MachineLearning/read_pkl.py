import pickle
import sys

def predecir_gastos(cc_num):
    """
    Función para predecir gastos basada en el número de tarjeta de crédito proporcionado.

    Args:
    cc_num (int): Número de tarjeta de crédito para el cual se quiere predecir gastos.

    Returns:
    Series: Predicciones de gastos para los próximos 5 periodos, formateadas a dos decimales.
    """
    # Carga el modelo desde el archivo pickle
    with open('src\infrastructure\API\Controllers\MachineLearning\modelo_arima.pkl', 'rb') as f:
        loaded_model = pickle.load(f)

    # Prepara la variable exógena para la predicción, si el modelo lo requiere
    exog_data = [cc_num] * 5  # Repite cc_num para cada periodo si es necesario

    # Realiza la predicción de gastos
    gastos_predichos = loaded_model.get_forecast(steps=5, exog=exog_data)
    predicted_means = gastos_predichos.predicted_mean

    # Redondear cada predicción a dos decimales
    predicted_means_rounded = predicted_means.round(2)

    # Devuelve la predicción de gastos
    return predicted_means_rounded

# Ejemplo de uso, proporcionando un número de tarjeta de crédito para la predicción
cc_num_ejemplo = sys.argv[1]
  # Cambia esto por un cc_num válido para tu modelo
try:
    gastos_predichos = predecir_gastos(cc_num_ejemplo)
    print({"gastos_predichos": gastos_predichos})
except Exception as e:
    print(f"Error: {e}")