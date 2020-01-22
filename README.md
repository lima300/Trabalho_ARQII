# UNIVERSIDADE FEDERAL DE LAVRAS

###### Departamento de Ciência da Computação

###### Bacharelado em Ciência da Computação

###### Disciplina: **Arquitetura de Computadores II** – **GCC123**

###### 2º Semestre de 2019 - Professor: **Luiz Henrique A. Correia**

###### Trabalho Prático – Valor: 30 pontos

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O objetivo deste trabalho é desenvolver o aprendizado sobre preditores de desvio. Serão estudados, implementados e avaliados os seguintes tipos de preditores de desvio: Preditor local de desvios (BHT), Preditor Global (GHT) e Preditor Híbrido. Utilizando-se de linguagens de programação será desenvolvido um programa para **simular** o comportamento dos preditores de desvios.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A descrição deste trabalho é mesma do trabalho solicitado pelo Prof. E. F. Gehringer para o curso de Computer Design & Technology da North Caroline University. Foram realizadas pequenas modificações da descrição original.

## Metodologia

Os grupos serão formados por **exatamente 5 alunos**, salvo casos omissos. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O simulador deve ser desenvolvido para apresentação na Web em linguagem e formato da preferência dos alunos. Dessa forma, é importante que o simulador mostre de maneira gráfica todas as etapas envolvidas durante a predição.

### Especificação do trabalho:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Neste trabalho serão modelados e implementado: Preditor Local de desvios (**BHT**), Preditor Global de desvios (**GHT**) e o Preditor Híbrido.

1. Os preditor local BHT pode ser modelado como um preditor de parâmetros (m, n), onde:

*m* - é o número de bits do PC de mais baixa ordem (LSB) usados para indexar a tabela de histórico local (branch-history table).

*n* - número de bits armazenados no registro da tabela de histórico local.

O diagrama do preditor de desvio local é mostrado na Figura 1, tal que:

&nbsp;- A tabela de registros do desvio local é indexada pelos m bits de mais baixa ordem do endereço da instrução de desvio (isto é, o valor do PC quando o desvio é buscado (IF), não o destino do desvio). Esses m bits são os bits menos significativos do endereço, e não incluem os dois bits menos significativos do PC, pois estes são sempre zero (ou seja, use os m + 1 a 2 bits do PC).

&nbsp;- Um valor armazenado no registrador em um histórico de desvios é usado para indexar um array de contadores. Logo, se n é o número de bits armazenados no registro de histórico de desvios, então existirão 2 n contadores.

&nbsp;- Os registradores do histórico de desvios são todos inicializados em zero no início da simulação.

&nbsp;- Sempre que um desvio é predito, o resultado do branch é deslocado para a posição do bit mais significativo do registrador do histórico de desvio que contém o histórico desse branch (Observe que no hardware real, não poderíamos mudar o resultado do branch até o estágio EX do pipeline. No entanto, isso é apenas uma simulação e lemos o resultado do branch no arquivo de trace, para que possamos usá-lo imediatamente.).

&nbsp;- Não há tags e nenhuma verificação de tags (sem sinais de falha para o preditor).

&nbsp;- Cada um dos 2 n contadores contém 2 bits.

&nbsp;&nbsp;(a) O contador é incrementado quando o desvio é Tomado e decrementado quando é Não-Tomado.

&nbsp;&nbsp;(b) O contador satura em 0 e 3.

&nbsp;&nbsp;(c) Se o valor do contador for maior ou igual a dois, o desvio é predito como tomado, caso contrário, é predito como Não-tomado.

&nbsp;&nbsp;(d) Todos os contadores devem ser setados para 2 quando a simulação começar.

![Diagrama do preditor local de desvios.](/home/monika/Documentos/UFLA/Arq2/Figure 1.png  "Figure 1")
    
2. O preditor de desvios global, ou GHT, é modelado com o parâmetro n, onde:

*n* - é o número de bits do registrador de histórico global de desvios.

O diagrama do preditor de desvio Global é mostrado na Figura 2, tal que:

&nbsp;- Sempre que um desvio é predito, o resultado do desvio mais recente é deslocado para a posição do bit mais significativo do registrador global de histórico de desvios para um branch.

&nbsp;- O registrador do histórico global é inicializado com zero no início da simulação.

&nbsp;- Não há tags e nenhuma verificação de tags (sem sinais de falha para o preditor).

&nbsp;- Cada um dos 2 n contadores contém 2 bits:

&nbsp;&nbsp;(a) O contador é incrementado quando o desvio é Tomado e decrementado quando é Não-Tomado.

&nbsp;&nbsp;(b) O contador satura em 0 e 3 (o contador nunca ficará abaixo de zero ou acima de 3).

&nbsp;&nbsp;(c) O contador é atualizado depois que a predição é feita.

&nbsp;&nbsp;(d) Se o valor do contador é maior ou igual a dois, o branch é predito como Tomado, caso contrário será predito com Não-tomado.

&nbsp;&nbsp;(e) Todos os contadores devem ser setados para 2 quando a simulação começa.
    
### Continua... no próximo commit
