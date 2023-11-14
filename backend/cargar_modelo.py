import joblib

# Ruta al modelo guardado
modelo_guardado = "modelo_logistico.pkl"

# Cargar el modelo
modelo_logistico = joblib.load(modelo_guardado)

# Imprimir el modelo (se enviará de vuelta a Node.js)
print(modelo_logistico)

