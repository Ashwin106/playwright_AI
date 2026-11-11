export interface BaseAgent <Tinput,Toutput>{

    name: string;
    execute(input: Tinput): Promise<Toutput>;
}

//Tinput is the type of input the agent expects, and Toutput is the type of output the agent produces. 
/* The execute method takes an input of type Tinput and returns a Promise that resolves to an
 output of type Toutput.*/