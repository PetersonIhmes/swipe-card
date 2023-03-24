# swipe-card
 Like or dislike a card 

- REACT-NATIVE
- HOOKS 
- ANIMATED
- LAYOUT ANIMATION
- MATH RANDOM
- PAN RESPONDER 
- DIMENSION


![20230324_105446](https://user-images.githubusercontent.com/118133517/227540574-b78f3a58-fa0d-4d02-a346-56fae9f8cc01.gif)



# - O Projeto 
 Este código é um exemplo de um aplicativo de "swipe card" simples 
usando o React Native. A ideia é mostrar uma pilha de cartões 
Lque o usuário pode arrastar para a esquerda ou para a direita
 para indicar que gosta ou não do cartão.
 Cada cartão é uma View animada que é movida com base no gesto do usuário.
 O código usa várias funções importantes do React Native,
incluindo Animated, Dimensions, LayoutAnimation e PanResponder.

# - Entendendo o Código
O código começa definindo alguns valores iniciais, como offset
(a distância mínima que um cartão deve ser deslizado para ser considerado
"curtido" ou "não curtido"), random (uma função que retorna um número inteiro
aleatório entre 0 e 150) e randomColor (uma função que retorna uma string
no formato RGB com valores de cor aleatórios).
 Em seguida, cria uma série de cores aleatórias para serem usadas como plano
de fundo dos cartões.
