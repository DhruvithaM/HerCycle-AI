import os
import json

import joblib
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# ==========================================================
# PATH CONFIGURATION
# ==========================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

CLIENT_DIR = os.path.dirname(
    BASE_DIR
)

MODEL_PATH = os.path.join(
    CLIENT_DIR,
    "ml",
    "models",
    "pcos_ml_model.joblib"
)

FEATURES_PATH = os.path.join(
    CLIENT_DIR,
    "ml",
    "models",
    "model_features.json"
)


# ==========================================================
# FASTAPI APP
# ==========================================================

app = FastAPI(
    title="HerCycle AI PCOS Prediction API",
    version="1.0.0",
)


# ==========================================================
# CORS CONFIGURATION
# Allows React/Vite frontend to communicate with backend
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # Local development
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",

        # Vercel production frontend
        "https://her-cycle-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# LOAD ML MODEL
# ==========================================================

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"ML model not found at: {MODEL_PATH}"
    )

if not os.path.exists(FEATURES_PATH):
    raise FileNotFoundError(
        f"Feature file not found at: {FEATURES_PATH}"
    )


model = joblib.load(
    MODEL_PATH
)


with open(
    FEATURES_PATH,
    "r",
    encoding="utf-8",
) as file:
    model_features = json.load(file)


print("\n" + "=" * 60)
print("HER CYCLE AI - BACKEND STARTED")
print("=" * 60)
print("ML Model loaded successfully")
print("Features loaded:", len(model_features))
print("=" * 60 + "\n")


# ==========================================================
# REQUEST MODEL
# These 13 features match the ML model exactly
# ==========================================================

class PCOSPredictionRequest(BaseModel):

    age: float

    weight: float

    height: float

    bmi: float

    cycle_regular: int

    cycle_length: float

    weight_gain: int

    hair_growth: int

    skin_darkening: int

    hair_loss: int

    pimples: int

    fast_food: int

    regular_exercise: int


# ==========================================================
# ROOT API
# ==========================================================

@app.get("/")
def home():

    return {
        "message": (
            "HerCycle AI PCOS/PCOD "
            "Machine Learning API is running"
        ),
        "model_loaded": True,
        "total_features": len(model_features),
    }


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "model": "PCOS/PCOD ML Model",
    }


# ==========================================================
# PREDICTION API
# ==========================================================

@app.post("/predict")
def predict_pcos(
    data: PCOSPredictionRequest
):

    try:

        # --------------------------------------------------
        # MAP FRONTEND DATA TO ORIGINAL DATASET COLUMNS
        # --------------------------------------------------

        input_data = {

            "Age (yrs)": data.age,

            "Weight (Kg)": data.weight,

            "Height(Cm)": data.height,

            "BMI": data.bmi,

            "Cycle(R/I)": data.cycle_regular,

            "Cycle length(days)": data.cycle_length,

            "Weight gain(Y/N)": data.weight_gain,

            "hair growth(Y/N)": data.hair_growth,

            "Skin darkening (Y/N)": data.skin_darkening,

            "Hair loss(Y/N)": data.hair_loss,

            "Pimples(Y/N)": data.pimples,

            "Fast food (Y/N)": data.fast_food,

            "Reg.Exercise(Y/N)": data.regular_exercise,
        }


        # --------------------------------------------------
        # CREATE DATAFRAME
        # --------------------------------------------------

        input_dataframe = pd.DataFrame(
            [input_data]
        )


        # --------------------------------------------------
        # ENSURE EXACT FEATURE ORDER
        # --------------------------------------------------

        input_dataframe = input_dataframe[
            model_features
        ]


        # --------------------------------------------------
        # ML PREDICTION
        # --------------------------------------------------

        prediction = int(
            model.predict(
                input_dataframe
            )[0]
        )


        # --------------------------------------------------
        # PREDICTION PROBABILITY
        # --------------------------------------------------

        probability = float(
            model.predict_proba(
                input_dataframe
            )[0][1]
        )


        probability_percentage = round(
            probability * 100,
            2
        )


        # --------------------------------------------------
        # DETERMINE RISK LEVEL
        # --------------------------------------------------

        if probability < 0.30:

            risk_level = "Low"

        elif probability < 0.60:

            risk_level = "Moderate"

        else:

            risk_level = "High"


        # --------------------------------------------------
        # RETURN RESULT
        # --------------------------------------------------

        return {

            "success": True,

            "prediction": prediction,

            "prediction_label": (
                "Higher likelihood of PCOS"
                if prediction == 1
                else "Lower likelihood of PCOS"
            ),

            "probability": probability,

            "probability_percentage": (
                probability_percentage
            ),

            "risk_level": risk_level,

            "message": (
                "This result is generated using "
                "a machine learning model trained "
                "on a PCOS dataset. It is a risk "
                "assessment and not a medical diagnosis."
            ),
        }


    except Exception as error:

        print(
            "Prediction error:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )