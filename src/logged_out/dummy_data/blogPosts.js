import React, { Fragment } from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";

const intro = (
  <Fragment>
    <Typography variant="h6" paragraph>
      Elección de la red
    </Typography>
    <Typography paragraph>
      Arrancamos el desarrollo de nuestro proyecto siguiendo un tutorial de PyTorch
      básico de cómo implementar un entrenamiento. Una vez que logramos que este ande
      empezamos la búsqueda de alguna red que aplique más a nuestro caso.
      Tras analizar varios papers, nos decantamos en que la mejor opción para nuestro
      proyecto sería utilizar una ResNet50, y comenzamos entrenando con el dataset del
      tutorial para entender su funcionamiento.
    </Typography>
  </Fragment>
);

const second = (
    <Fragment>
      <Typography variant="h6" paragraph>
        Elegimos el dataset de kaggle a utilizar
      </Typography>
      <Typography paragraph>
        A continuación, tras descargar imágenes de ISIC ya clasificadas
        en kaggle, logramos cargar nuestro dataset al notebook y entrenar
        al modelo utilizando el mismo. Una vez concluido el entrenamiento
        del modelo, agregamos una función para guardarlo en google drive,
        y otra para cargarlo en un futuro sin tener que rehacer el entrenamiento.
      </Typography>
    </Fragment>
);

const tercero = (
    <Fragment>
      <Typography variant="h6" paragraph>
        Para poder validar desarrollamos la carga de una imagen
      </Typography>
      <Typography paragraph>
        Con el modelo ya entrenado con el dataset que realmente íbamos a
        usar, era cuestión de hacer validaciones sobre el mismo. Comenzamos
        cargando imágenes por separado de forma manual, lo que nos hizo
        descubrir que teníamos errores en los parámetros del modelo, en como
        preprocesabamos las imágenes, y en cómo interpretamos las labels.
      </Typography>
    </Fragment>
);

const cuarto = (
    <Fragment>
        <Typography variant="h6" paragraph>
            Contar problemas que nos encontramos en el camino y cómo los solucionamos
        </Typography>
        <Typography paragraph>
            Primero tuvimos problemáticas respecto a los parámetros del modelo.
            Al seguir un tutorial mientras terminamos de entenderlo, estábamos
            entrenando un modelo de clasificación binaria, pero dándole un dataset
            de 10 labels distintas. Esto nos daba errores de compilación, y luego
            de ejecución, hasta que entendimos cómo configurar correctamente los
            parámetros.
        </Typography>
        <Typography paragraph>
            La segunda dificultad que nos encontramos, fue que debido al peso
            y tamaño del dataset, colab se detenía en mitad del entrenamiento
            porque la RAM se agotaba. Pensamos en utilizar una GPU dedicada con
            una de nuestras computadoras como entorno de trabajo, pero lo pudimos
            solucionar ajustando el batch size.
        </Typography>
        <Typography paragraph>
            Al querer probar el modelo, la función que usábamos para darle una
            imágen al modelo y ver su resultado, nos devolvía el mismo label
            para todas las imágenes, incluso las usadas en el training. Esto era
            debido a que el preprocesamiento del método que usábamos difería con
            la del entrenamiento del modelo, por lo que no entendía que le estábamos
            dando. Al corregir los valores del preprocesamiento, el modelo era capaz
            de reconocer correctamente las imágenes, tanto nuevas como las usadas en
            el test, y dar su label correspondiente.
        </Typography>
        <Typography paragraph>
            Colab tenía problemas con google drive para poder cargar los datasets
            a la hora de hacer la validación, por lo que cuando queríamos cargar
            una imágen de prueba, la ejecución fallaba. Pudimos solucionar esto
            configurando el remount de Google Drive, y así hacer las matrices de
            confusión para poder validar los resultados del modelo.
        </Typography>
        <Typography paragraph>
            Por último, con las matrices de confusión vimos que el modelo confundía
            el melanoma con Nevus usando el Top 1 de las predicciones, pero por muy
            poca diferencia, ya que usando el Top 2 la predicción era correcta. Para
            poder solventar esto en el tiempo que teníamos disponible, ya que ampliar
            el dataset o probar más parámetros se nos iría del scope, decidimos
            re-pensar el cómo daríamos nuestra predicción al usuario a través del sitio
            web: Si una de las dos labels más altas no es benigna, o presenta un riesgo
            para la salud considerable, aconsejamos el visitar a un profesional.
            Decidimos esto, ya que al pensar en las posibles situaciones, es preferible
            un falso positivo antes que un falso negativo.
        </Typography>
    </Fragment>
);

const quinto = (
    <Fragment>
        <Typography variant="h6" paragraph>
            Nuestro proceso de validación
        </Typography>
        <Typography paragraph>
            Una vez solucionadas todas estas problemáticas, el modelo estaba
            listo para hacer validaciones en serio, por lo que aplicamos una
            matriz de confusión sobre un dataset de validación, y analizamos
            los resultados de dos formas diferentes: el top1 y el top2.
            Viendo las matrices de confusión nos dimos cuenta que, por muy poca
            diferencia de peso, confundía al melanoma con nevus en todos los casos,
            por lo que planteamos dos opciones: entrenar el modelo nuevamente con
            otro número de epochs o interpretar la respuesta del modelo mediante
            el top2.
        </Typography>
        <Typography paragraph>

            Cuando entrenamos el modelo con más epochs que antes, el overfitting era
            inminente, y la accuracy disminuye considerablemente, por lo que probamos
            usar menos epochs, pero el resultado también era peor, por lo que
            determinamos que 10 era el número exacto de epochs.
            Nuestra única alternativa, era interpretar de otra manera la respuesta,
            por lo que aprovechando que los errores del modelo eran debido a una muy
            baja diferencia entre los dos labels más probables, decidimos hacer lo
            siguiente:
        </Typography>
        <ul>
            <li> Notificar al usuario que cargó su imágen sobre las dos patologías más probables según el modelo. </li>
            <li> En caso de que al menos una de las dos no fuera benigna, recomendarle asistir a un profesional. </li>
        </ul>

    </Fragment>
);

const sexto = (
    <Fragment>
        <Typography variant="h6" paragraph>
            Tabla que representa como progresa la accuracy con los distintos epochs.
        </Typography>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> Epochs </TableCell>
                        <TableCell align="right"> Accuracy </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={9}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            9
                        </TableCell>
                        <TableCell align="right"> 51.69% </TableCell>
                    </TableRow>
                    <TableRow
                        key={10}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            10
                        </TableCell>
                        <TableCell align="right">a number</TableCell>
                    </TableRow>
                    <TableRow
                        key={11}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            11
                        </TableCell>
                        <TableCell align="right">a number</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Fragment>
);

const septimo = (
    <Fragment>
      <Typography variant="h6" paragraph>
          Gráfico que representa como progresa la loss en el entrenamiento.
      </Typography>
    </Fragment>
);

const posts = [
  {
    title: "Introducción al proyecto",
    id: 1,
    date: new Date('2021-10-17'),
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost1.jpg`,
    snippet:
      "Arrancamos el desarrollo de nuestro proyecto siguiendo un tutorial de PyTorch básico de cómo implementar un entrenamiento",
    content: intro,
  },
  {
    title: "Imagenes",
    id: 2,
    date: new Date('2021-11-12'),
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost2.jpg`,
    snippet:
      "A continuación, tras descargar imágenes de ISIC ya clasificadas en kaggle, logramos cargar nuestro dataset al notebook",
    content: second,
  },
  {
    title: "Carga de una Imagen",
    id: 3,
    date: new Date('2021-11-14'),
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost3.jpg`,
    snippet:
      "Con el modelo ya entrenado con el dataset que realmente íbamos a usar, era cuestión de hacer validaciones sobre el mismo.",
    content: tercero,
  },
  {
    title: "Problemas resueltos",
    id: 4,
    date: new Date('2021-11-16'),
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost4.jpg`,
    snippet:
      "Primero tuvimos problemáticas respecto a los parámetros del modelo. Al seguir un tutorial mientras terminamos de entenderlo,",
    content: cuarto,
  },
  {
    title: "Validación",
    id: 5,
    date: new Date('2021-11-18'),
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost5.jpg`,
    snippet:
      "Una vez solucionadas todas estas problemáticas, el modelo estaba listo para hacer validaciones en serio, por lo que aplicamos una matriz de confusión sobre un dataset de validación",
    content: quinto,
  },
  {
    title: "Accuracy",
    id: 6,
    date: new Date('2021-11-18'),
    src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost6.jpg`,
    snippet:
      "Tabla que representa como progresa la accuracy con los distintos epochs.",
    content: sexto,
  },
    {
        title: "Loss",
        id: 7,
        date: new Date('2021-11-18'),
        src: `${process.env.PUBLIC_URL}/images/logged_out/blogPost7.jpg`,
        snippet:
            "Gráfico que representa como progresa la loss en el entrenamiento.",
        content: septimo,
    },
];

export default posts;
