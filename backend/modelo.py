import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.metrics import accuracy_score, classification_report


# Carga el archivo Excel en un DataFrame
data_frame = pd.read_excel(r'C:\Users\joaco\OneDrive\Escritorio\RAMOS\CAPSTONE\Aplicacion\diagnostico_de_cancer_ml\backend\datos_modelo.xlsx')


# Define los nombres de las columnas
nombres_columnas = [
    "rut",
    "nombre",
    "apellido_paterno",
    "apellido_materno",
    "genero",
    "fecha_de_nacimiento",
    "correo_electronico",
    "telefono",
    "edad",
    "cancer",
    "diagnostico_inicial",
    "radiografias",
    "condiciones_fisicas",
    "condiciones_ambientales",
    "datos_gen_mol",
    "historia_medica"
]

# Asigna los nombres de las columnas al DataFrame
data_frame.columns = nombres_columnas



label_encoder = LabelEncoder()

data_frame['cancer'] = label_encoder.fit_transform(data_frame['cancer'])
data_frame['cancer'] = data_frame['cancer'].replace({1: 1, 2: 0})

le_diagnostico_inicial = LabelEncoder()
data_frame['diagnostico_inicial'] = le_diagnostico_inicial.fit_transform(data_frame['diagnostico_inicial'])

le_condiciones_fisicas = LabelEncoder()
data_frame['condiciones_fisicas'] = le_condiciones_fisicas.fit_transform(data_frame['condiciones_fisicas'])

le_condiciones_ambientales = LabelEncoder()
data_frame['condiciones_ambientales'] = le_condiciones_ambientales.fit_transform(data_frame['condiciones_ambientales'])

le_datos_geneticos = LabelEncoder()
data_frame['datos_gen_mol'] = le_datos_geneticos.fit_transform(data_frame['datos_gen_mol'])

le_historia_medica = LabelEncoder()
data_frame['historia_medica'] = le_historia_medica.fit_transform(data_frame['historia_medica'])

# Definir las características (eje X) con las columnas Feature1 a Feature5
X = data_frame[["edad", "diagnostico_inicial", "condiciones_fisicas", "condiciones_ambientales", "datos_gen_mol", "historia_medica"]]

# Definir la variable objetivo (eje Y) como la columna "Target"
y = data_frame["cancer"]

# Dividir el conjunto de datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear un modelo Random Forest
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

# Entrenar el modelo en el conjunto de entrenamiento
rf_model.fit(X_train, y_train)

# Realizar predicciones en el conjunto de prueba
y_pred = rf_model.predict(X_test)

# Calcular la precisión del modelo en el conjunto de prueba
accuracy = accuracy_score(y_test, y_pred)
print(f'Precisión del modelo Random Forest: {accuracy}')

# Generar un informe de clasificación en el conjunto de prueba
report = classification_report(y_test, y_pred)

# Imprimir el informe de clasificación
print("Informe de clasificación en el conjunto de prueba:\n", report)

# Crear un modelo de Bosque Aleatorio para la validación cruzada
rf_model_cv = RandomForestClassifier(n_estimators=100, random_state=42)

# Realizar validación cruzada con 5 divisiones
cv_scores = cross_val_score(rf_model_cv, X, y, cv=5, scoring='accuracy')

# Imprimir los puntajes de validación cruzada
print("Puntajes de validación cruzada:", cv_scores)

# Calcular y mostrar el promedio de los puntajes
print("Precisión media: ", cv_scores.mean())
print("Desviación estándar de la precisión: ", cv_scores.std())

# Agregar predicciones al DataFrame original
data_frame['Prediccion'] = rf_model.predict(X)

# Crear un nuevo DataFrame solo con las columnas relevantes, incluida la columna de predicciones
resultados_df = data_frame[["rut", "Prediccion"]]

# Guardar el DataFrame con las predicciones en un archivo Excel
resultados_df.to_excel('frontend/resultados_prediccion.xlsx', index=False)

# Imprimir un mensaje indicando que el archivo se ha guardado
print("Archivo 'resultados_prediccion.xlsx' guardado correctamente.")


