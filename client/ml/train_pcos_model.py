import os
import re
import json
import warnings

import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import (
    train_test_split,
    cross_val_score,
    StratifiedKFold,
)

from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
    roc_auc_score,
)

from sklearn.linear_model import LogisticRegression

from sklearn.ensemble import (
    RandomForestClassifier,
    GradientBoostingClassifier,
)


warnings.filterwarnings("ignore")


# ==========================================================
# HER CYCLE AI
# PCOD / PCOS MACHINE LEARNING MODEL TRAINING
# ==========================================================


# ==========================================================
# PATH CONFIGURATION
# ==========================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "PCOD data.xlsx"
)

MODELS_DIR = os.path.join(
    BASE_DIR,
    "models"
)

RESULTS_DIR = os.path.join(
    BASE_DIR,
    "results"
)


os.makedirs(
    MODELS_DIR,
    exist_ok=True
)

os.makedirs(
    RESULTS_DIR,
    exist_ok=True
)


# ==========================================================
# SELECTED HERCYCLE USER-FACING FEATURES
# ==========================================================

SELECTED_FEATURES = [

    "Age (yrs)",

    "Weight (Kg)",

    "Height(Cm)",

    "BMI",

    "Cycle(R/I)",

    "Cycle length(days)",

    "Weight gain(Y/N)",

    "hair growth(Y/N)",

    "Skin darkening (Y/N)",

    "Hair loss(Y/N)",

    "Pimples(Y/N)",

    "Fast food (Y/N)",

    "Reg.Exercise(Y/N)",

]


# ==========================================================
# CLEAN COLUMN NAME
# ==========================================================

def clean_column_name(column_name):

    column_name = str(column_name)

    column_name = column_name.replace(
        "\n",
        " "
    )

    column_name = column_name.replace(
        "\r",
        " "
    )

    column_name = re.sub(
        r"\s+",
        " ",
        column_name
    )

    return column_name.strip()


# ==========================================================
# NORMALIZE COLUMN NAME
# USED FOR FLEXIBLE COLUMN MATCHING
# ==========================================================

def normalize_column_name(column_name):

    column_name = str(column_name).lower()

    column_name = column_name.replace(
        " ",
        ""
    )

    column_name = column_name.replace(
        "_",
        ""
    )

    column_name = column_name.replace(
        ".",
        ""
    )

    column_name = column_name.replace(
        "(",
        ""
    )

    column_name = column_name.replace(
        ")",
        ""
    )

    column_name = column_name.replace(
        "/",
        ""
    )

    column_name = column_name.replace(
        "-",
        ""
    )

    return column_name


# ==========================================================
# FIND MATCHING COLUMN
# ==========================================================

def find_matching_column(
    dataframe,
    requested_column
):

    # Exact match first
    if requested_column in dataframe.columns:
        return requested_column

    requested_normalized = (
        normalize_column_name(
            requested_column
        )
    )

    # Flexible normalized match
    for column in dataframe.columns:

        column_normalized = (
            normalize_column_name(
                column
            )
        )

        if (
            column_normalized
            ==
            requested_normalized
        ):
            return column

    return None


# ==========================================================
# FIND PCOS / PCOD TARGET COLUMN
# ==========================================================

def find_target_column(dataframe):

    possible_target_columns = [

        "PCOS (Y/N)",

        "PCOS(Y/N)",

        "PCOS",

        "PCOD (Y/N)",

        "PCOD(Y/N)",

        "PCOD",

    ]

    # Exact or normalized matching
    for requested_column in possible_target_columns:

        matched_column = (
            find_matching_column(
                dataframe,
                requested_column
            )
        )

        if matched_column is not None:

            return matched_column

    # Final flexible search
    for column in dataframe.columns:

        normalized_column = (
            normalize_column_name(
                column
            )
        )

        if (
            "pcos" in normalized_column
            or
            "pcod" in normalized_column
        ):

            return column

    return None


# ==========================================================
# FIND THE CORRECT EXCEL SHEET
# ==========================================================

def load_correct_dataset(excel_path):

    print("\nChecking Excel workbook sheets...")

    excel_file = pd.ExcelFile(
        excel_path
    )

    sheet_names = (
        excel_file.sheet_names
    )

    print("\nAvailable sheets:")

    for index, sheet_name in enumerate(
        sheet_names,
        start=1
    ):

        print(
            f"{index}. {sheet_name}"
        )


    # ------------------------------------------------------
    # CHECK EVERY SHEET FOR A PCOS / PCOD TARGET COLUMN
    # ------------------------------------------------------

    for sheet_name in sheet_names:

        print(
            f"\nChecking sheet: {sheet_name}"
        )

        try:

            temp_df = pd.read_excel(
                excel_path,
                sheet_name=sheet_name
            )

            temp_df.columns = [

                clean_column_name(
                    column
                )

                for column in temp_df.columns

            ]

            target_column = (
                find_target_column(
                    temp_df
                )
            )

            if target_column is not None:

                print(
                    f"✓ Correct dataset sheet found: "
                    f"{sheet_name}"
                )

                print(
                    f"✓ Target column found: "
                    f"{target_column}"
                )

                return (
                    temp_df,
                    sheet_name,
                    target_column
                )

        except Exception as error:

            print(
                f"Could not read sheet "
                f"'{sheet_name}':"
            )

            print(error)


    # ------------------------------------------------------
    # IF NO SHEET HAS THE TARGET COLUMN
    # ------------------------------------------------------

    raise ValueError(

        "\nCould not find a sheet containing "
        "a PCOS/PCOD target column.\n"

        "Please check your Excel workbook."
    )


# ==========================================================
# CONVERT TARGET TO 0 / 1
# ==========================================================

def convert_target(value):

    if pd.isna(value):

        return np.nan


    # Numeric value
    if isinstance(
        value,
        (
            int,
            float,
            np.integer,
            np.floating,
        )
    ):

        if value == 1:

            return 1

        if value == 0:

            return 0

        return np.nan


    value = (
        str(value)
        .strip()
        .lower()
    )


    positive_values = [

        "1",

        "yes",

        "y",

        "true",

        "positive",

        "pcos",

        "pcod",

    ]


    negative_values = [

        "0",

        "no",

        "n",

        "false",

        "negative",

    ]


    if value in positive_values:

        return 1


    if value in negative_values:

        return 0


    return np.nan


# ==========================================================
# MAIN PROGRAM
# ==========================================================

print("\n" + "=" * 70)

print(
    "HER CYCLE AI - PCOD / PCOS ML MODEL TRAINING"
)

print("=" * 70)


# ==========================================================
# CHECK DATASET
# ==========================================================

print("\nLoading dataset...")

print(
    "Dataset path:",
    DATA_PATH
)


if not os.path.exists(
    DATA_PATH
):

    raise FileNotFoundError(

        "\nDataset not found!\n\n"

        f"Expected location:\n"
        f"{DATA_PATH}"
    )


# ==========================================================
# LOAD THE CORRECT SHEET AUTOMATICALLY
# ==========================================================

df, sheet_used, target_column = (
    load_correct_dataset(
        DATA_PATH
    )
)


print("\n" + "=" * 70)

print(
    "DATASET LOADED SUCCESSFULLY"
)

print("=" * 70)


print(
    "\nSheet used:",
    sheet_used
)


print(
    "Target column:",
    target_column
)


print(
    "\nOriginal dataset shape:"
)

print(
    df.shape
)


print(
    "\nDataset columns:"
)


for index, column in enumerate(
    df.columns,
    start=1
):

    print(
        f"{index}. {column}"
    )


# ==========================================================
# REMOVE COMPLETELY EMPTY COLUMNS
# ==========================================================

empty_columns = [

    column

    for column in df.columns

    if df[column].isna().all()

]


if empty_columns:

    print(
        "\nRemoving completely empty columns:"
    )

    for column in empty_columns:

        print(
            "-",
            column
        )


    df = df.drop(
        columns=empty_columns
    )


# ==========================================================
# REMOVE UNNAMED COLUMNS
# ==========================================================

unnamed_columns = [

    column

    for column in df.columns

    if str(column)
    .lower()
    .startswith("unnamed")

]


if unnamed_columns:

    print(
        "\nRemoving unnamed columns:"
    )

    for column in unnamed_columns:

        print(
            "-",
            column
        )


    df = df.drop(
        columns=unnamed_columns
    )


# ==========================================================
# CHECK TARGET COLUMN STILL EXISTS
# ==========================================================

if target_column not in df.columns:

    raise ValueError(

        "\nThe target column was removed "
        "unexpectedly."
    )


# ==========================================================
# SHOW ORIGINAL TARGET VALUES
# ==========================================================

print(
    "\nOriginal target distribution:"
)

print(
    df[target_column]
    .value_counts(
        dropna=False
    )
)


# ==========================================================
# CLEAN TARGET
# ==========================================================

df[target_column] = (

    df[target_column]
    .apply(
        convert_target
    )

)


# Remove rows where target is invalid or missing

df = df.dropna(
    subset=[
        target_column
    ]
)


df[target_column] = (

    df[target_column]
    .astype(int)

)


print(
    "\nCleaned target distribution:"
)

print(
    df[target_column]
    .value_counts()
)


# ==========================================================
# SELECT ONLY HERCYCLE-COMPATIBLE FEATURES
# ==========================================================

print(
    "\n" + "=" * 70
)

print(
    "SELECTING HERCYCLE USER-FACING FEATURES"
)

print(
    "=" * 70
)


matched_features = []

missing_features = []


for requested_feature in SELECTED_FEATURES:

    matched_column = (
        find_matching_column(
            df,
            requested_feature
        )
    )


    if matched_column is not None:

        matched_features.append(
            matched_column
        )

        print(
            f"✓ Using: "
            f"{matched_column}"
        )


    else:

        missing_features.append(
            requested_feature
        )

        print(
            f"✗ Not found: "
            f"{requested_feature}"
        )


# ==========================================================
# CHECK IF ENOUGH FEATURES WERE FOUND
# ==========================================================

if len(matched_features) < 5:

    raise ValueError(

        "\nToo few required features were found.\n"

        "Please check the dataset columns."
    )


print(
    "\nTotal selected features:",
    len(matched_features)
)


# ==========================================================
# CREATE X AND y
# ==========================================================

X = df[
    matched_features
].copy()


y = df[
    target_column
].copy()


# ==========================================================
# CONVERT ALL SELECTED FEATURES TO NUMERIC
# ==========================================================

print(
    "\nPreparing selected features..."
)


for column in X.columns:

    X[column] = pd.to_numeric(

        X[column],

        errors="coerce"

    )


# Replace infinity values

X = X.replace(

    [
        np.inf,
        -np.inf
    ],

    np.nan

)


# ==========================================================
# REMOVE FEATURES THAT ARE COMPLETELY EMPTY
# ==========================================================

all_empty_features = [

    column

    for column in X.columns

    if X[column].isna().all()

]


if all_empty_features:

    print(
        "\nRemoving completely empty features:"
    )


    for column in all_empty_features:

        print(
            "-",
            column
        )


    X = X.drop(
        columns=all_empty_features
    )


# ==========================================================
# REMOVE CONSTANT FEATURES
# ==========================================================

constant_features = [

    column

    for column in X.columns

    if X[column]
    .nunique(
        dropna=True
    )
    <= 1

]


if constant_features:

    print(
        "\nRemoving constant features:"
    )


    for column in constant_features:

        print(
            "-",
            column
        )


    X = X.drop(
        columns=constant_features
    )


# ==========================================================
# FINAL DATASET INFORMATION
# ==========================================================

print(
    "\n" + "=" * 70
)

print(
    "FINAL ML DATASET"
)

print(
    "=" * 70
)


print(
    "\nNumber of samples:",
    len(X)
)


print(
    "Number of features:",
    X.shape[1]
)


print(
    "\nFeatures used:"
)


for index, column in enumerate(
    X.columns,
    start=1
):

    print(
        f"{index}. {column}"
    )


# ==========================================================
# TRAIN / TEST SPLIT
# ==========================================================

print(
    "\nSplitting dataset..."
)


X_train, X_test, y_train, y_test = (

    train_test_split(

        X,

        y,

        test_size=0.20,

        random_state=42,

        stratify=y,

    )

)


print(
    "Training samples:",
    len(X_train)
)


print(
    "Testing samples:",
    len(X_test)
)


# ==========================================================
# PREPROCESSING
# ==========================================================

preprocessor = Pipeline(

    steps=[

        (

            "imputer",

            SimpleImputer(
                strategy="median"
            ),

        ),

    ]

)


# ==========================================================
# MACHINE LEARNING MODELS
# ==========================================================

models = {

    "Logistic Regression":

        LogisticRegression(

            max_iter=5000,

            class_weight="balanced",

            random_state=42,

        ),


    "Random Forest":

        RandomForestClassifier(

            n_estimators=300,

            max_depth=None,

            min_samples_split=5,

            min_samples_leaf=2,

            class_weight="balanced",

            random_state=42,

            n_jobs=-1,

        ),


    "Gradient Boosting":

        GradientBoostingClassifier(

            n_estimators=200,

            learning_rate=0.05,

            max_depth=3,

            random_state=42,

        ),

}


# ==========================================================
# CROSS VALIDATION SETUP
# ==========================================================

cv = StratifiedKFold(

    n_splits=5,

    shuffle=True,

    random_state=42,

)


# ==========================================================
# TRAIN AND COMPARE MODELS
# ==========================================================

all_results = []

best_model_name = None

best_model_pipeline = None

best_cv_f1_score = -1


print(
    "\n" + "=" * 70
)

print(
    "TRAINING MACHINE LEARNING MODELS"
)

print(
    "=" * 70
)


for model_name, model in models.items():

    print(
        "\n" + "-" * 70
    )

    print(
        f"Training: {model_name}"
    )

    print(
        "-" * 70
    )


    pipeline = Pipeline(

        steps=[

            (

                "preprocessor",

                preprocessor,

            ),

            (

                "model",

                model,

            ),

        ]

    )


    # ------------------------------------------------------
    # TRAIN
    # ------------------------------------------------------

    pipeline.fit(

        X_train,

        y_train

    )


    # ------------------------------------------------------
    # PREDICTIONS
    # ------------------------------------------------------

    y_pred = pipeline.predict(
        X_test
    )


    y_probability = (

        pipeline
        .predict_proba(
            X_test
        )[:, 1]

    )


    # ------------------------------------------------------
    # METRICS
    # ------------------------------------------------------

    accuracy = accuracy_score(

        y_test,

        y_pred

    )


    precision = precision_score(

        y_test,

        y_pred,

        zero_division=0

    )


    recall = recall_score(

        y_test,

        y_pred,

        zero_division=0

    )


    f1 = f1_score(

        y_test,

        y_pred,

        zero_division=0

    )


    try:

        roc_auc = roc_auc_score(

            y_test,

            y_probability

        )

    except ValueError:

        roc_auc = np.nan


    # ------------------------------------------------------
    # CROSS VALIDATION
    # ------------------------------------------------------

    cv_scores = cross_val_score(

        pipeline,

        X,

        y,

        cv=cv,

        scoring="f1"

    )


    cv_f1_mean = (
        cv_scores.mean()
    )


    cv_f1_std = (
        cv_scores.std()
    )


    # ------------------------------------------------------
    # SAVE RESULT
    # ------------------------------------------------------

    result = {

        "Model":

            model_name,


        "Accuracy":

            round(
                accuracy,
                4
            ),


        "Precision":

            round(
                precision,
                4
            ),


        "Recall":

            round(
                recall,
                4
            ),


        "F1 Score":

            round(
                f1,
                4
            ),


        "ROC-AUC":

            round(
                roc_auc,
                4
            ),


        "CV F1 Mean":

            round(
                cv_f1_mean,
                4
            ),


        "CV F1 Std":

            round(
                cv_f1_std,
                4
            ),

    }


    all_results.append(
        result
    )


    # ------------------------------------------------------
    # PRINT RESULTS
    # ------------------------------------------------------

    print(
        "\nAccuracy:",
        round(
            accuracy,
            4
        )
    )


    print(
        "Precision:",
        round(
            precision,
            4
        )
    )


    print(
        "Recall:",
        round(
            recall,
            4
        )
    )


    print(
        "F1 Score:",
        round(
            f1,
            4
        )
    )


    print(
        "ROC-AUC:",
        round(
            roc_auc,
            4
        )
    )


    print(
        "Cross Validation F1:",
        round(
            cv_f1_mean,
            4
        )
    )


    print(
        "\nClassification Report:"
    )


    print(

        classification_report(

            y_test,

            y_pred,

            zero_division=0

        )

    )


    print(
        "Confusion Matrix:"
    )


    print(

        confusion_matrix(

            y_test,

            y_pred

        )

    )


    # ------------------------------------------------------
    # SELECT BEST MODEL USING CROSS-VALIDATION F1
    # ------------------------------------------------------

    if (

        cv_f1_mean
        >
        best_cv_f1_score

    ):

        best_cv_f1_score = (
            cv_f1_mean
        )

        best_model_name = (
            model_name
        )

        best_model_pipeline = (
            pipeline
        )


# ==========================================================
# CREATE MODEL COMPARISON TABLE
# ==========================================================

results_df = pd.DataFrame(
    all_results
)


results_df = results_df.sort_values(

    by="CV F1 Mean",

    ascending=False

)


comparison_path = os.path.join(

    RESULTS_DIR,

    "model_comparison.csv"

)


results_df.to_csv(

    comparison_path,

    index=False

)


print(
    "\n" + "=" * 70
)

print(
    "MODEL COMPARISON"
)

print(
    "=" * 70
)


print(

    results_df.to_string(

        index=False

    )

)


print(
    "\nModel comparison saved:"
)


print(
    comparison_path
)


# ==========================================================
# RETRAIN BEST MODEL ON COMPLETE DATASET
# ==========================================================

print(
    "\n" + "=" * 70
)

print(
    "BEST MODEL SELECTED"
)

print(
    "=" * 70
)


print(
    "\nBest model:",
    best_model_name
)


print(
    "Best Cross-Validation F1:",
    round(
        best_cv_f1_score,
        4
    )
)


print(
    "\nRetraining the best model "
    "using the complete dataset..."
)


best_model_pipeline.fit(

    X,

    y

)


# ==========================================================
# SAVE TRAINED MODEL
# ==========================================================

model_path = os.path.join(

    MODELS_DIR,

    "pcos_ml_model.joblib"

)


joblib.dump(

    best_model_pipeline,

    model_path

)


print(
    "\nTrained model saved successfully:"
)


print(
    model_path
)


# ==========================================================
# SAVE FEATURE LIST
# ==========================================================

features_path = os.path.join(

    MODELS_DIR,

    "model_features.json"

)


with open(

    features_path,

    "w",

    encoding="utf-8"

) as file:

    json.dump(

        X.columns.tolist(),

        file,

        indent=4

    )


print(
    "\nFeature list saved:"
)


print(
    features_path
)


# ==========================================================
# SAVE TRAINING INFORMATION
# ==========================================================

training_info = {

    "dataset_file":

        os.path.basename(
            DATA_PATH
        ),


    "sheet_used":

        sheet_used,


    "target_column":

        target_column,


    "total_samples":

        int(
            len(X)
        ),


    "total_features":

        int(
            X.shape[1]
        ),


    "features_used":

        X.columns.tolist(),


    "best_model":

        best_model_name,


    "best_cv_f1_score":

        round(

            float(
                best_cv_f1_score
            ),

            4

        ),

}


training_info_path = os.path.join(

    RESULTS_DIR,

    "training_info.json"

)


with open(

    training_info_path,

    "w",

    encoding="utf-8"

) as file:

    json.dump(

        training_info,

        file,

        indent=4

    )


print(
    "\nTraining information saved:"
)


print(
    training_info_path
)


# ==========================================================
# FINISHED
# ==========================================================

print(
    "\n" + "=" * 70
)

print(
    "PCOD / PCOS ML MODEL TRAINING COMPLETED SUCCESSFULLY"
)

print(
    "=" * 70
)


print(
    "\nGENERATED FILES"
)


print(
    "\n1. Trained ML Model:"
)


print(
    model_path
)


print(
    "\n2. Model Features:"
)


print(
    features_path
)


print(
    "\n3. Model Comparison:"
)


print(
    comparison_path
)


print(
    "\n4. Training Information:"
)


print(
    training_info_path
)


print(
    "\nNext step: Connect this trained model "
    "to a Python backend API."
)