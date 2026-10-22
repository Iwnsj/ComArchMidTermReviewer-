/* Curriculum paraphrased from the three supplied lesson PDFs. */
(function(root){
const topics = [
 {id:'cpu',name:'Computer Processor',short:'Processor',icon:'cpu',color:'sage',number:'01',file:'Computer-processor.pdf',pages:6,description:'Meet the CPU, follow an instruction, and connect the buses, cache, and cores.',time:'25 min',sections:[
  {id:'parts',title:'Inside a computer',summary:'A computer is a team of components. The CPU carries out instructions, memory holds the work in progress, and I/O connects the system to the outside world.',analogy:'Think of a kitchen: the CPU is the cook, registers are the ingredients in hand, main memory is the worktop, and secondary storage is the pantry.',visual:'computer'},
  {id:'cycle',title:'The instruction cycle',summary:'A program is a sequence of instructions. The processor repeatedly fetches an instruction, decodes it, executes the requested action, and writes back a result when needed.',analogy:'Following a recipe: get the next step, understand it, do it, and record the result. Then move on to the next step.',visual:'cycle'},
  {id:'instructions',title:'Four instruction categories',summary:'The lesson groups instruction actions into processor–memory, processor–I/O, data processing, and control. Ask whether the instruction moves data, transforms it, or changes what runs next.',analogy:'A calculator app loads a number, reads a key, adds values, and may jump to an error handler. Those actions belong to different categories.',visual:'instructions'},
  {id:'buses',title:'Buses & data movement',summary:'A system bus provides shared connections between the processor, memory, and I/O modules. Data lines carry values, address lines select locations, and control lines coordinate the transfer.',analogy:'For a delivery: the data is the parcel, the address is its destination, and control signals are the traffic rules.',visual:'buses'},
  {id:'performance',title:'Clock, cache & cores',summary:'Clock frequency, memory access, physical cores, and software parallelism all affect performance. More GHz or more cores alone does not guarantee that every program finishes faster.',analogy:'A faster worker, a nearby supply shelf, and more workers help in different ways. Extra workers help most when a job can be divided.',visual:'cache'},
  {id:'cores',title:'Processing together',summary:'A core is a physical execution unit. A software thread is a sequence of work. Multiple cores can process work concurrently; Hyper-Threading allows supported Intel cores to expose two logical execution contexts.',analogy:'Two workers are two physical cores. A worker alternating between two work queues illustrates logical threads, but does not become two separate workers.',visual:'cores'}]},
 {id:'os',name:'Operating Systems',short:'Operating systems',icon:'layers',color:'peach',number:'02',file:'Operating-System-Overview.pdf',pages:2,description:'See how the OS coordinates memory, processes, devices, and files.',time:'12 min',sections:[
  {id:'role',title:'The OS as a bridge',summary:'The operating system manages computer resources and provides services to programs. It sits between applications and hardware. Its two main objectives in the lesson are convenience and resource management.',analogy:'An OS is like a campus coordinator: people request services, and the coordinator arranges rooms, equipment, and time.',visual:'os'},
  {id:'memory',title:'Memory management',summary:'Memory management assigns portions of main memory to running programs and protects memory that belongs to the operating system. Programs should not be able to overwrite protected OS space.',analogy:'Assigned study desks keep each group’s work separate. A reserved desk stays unavailable to other groups.',visual:'memory'},
  {id:'processes',title:'Processor management',summary:'Processor management tracks processes and decides how CPU time is allocated. The lesson names two scheduling levels: job scheduling and process scheduling.',analogy:'A job scheduler admits customers into a waiting area. A process scheduler chooses which waiting customer is served next.',visual:'scheduler'},
  {id:'resources',title:'Devices, files & access',summary:'Device management coordinates device use. File management tracks stored files and controls who can access them and which actions are allowed.',analogy:'Managing a shared printer is device management. Organizing the documents and deciding who may edit them is file management.',visual:'resources'}]},
 {id:'io',name:'I/O Organization',short:'Input / output',icon:'plug',color:'lavender',number:'03',file:'Input-Output-Organization.pdf',pages:3,description:'Connect peripherals to the processor through interfaces, signals, and buffers.',time:'18 min',sections:[
  {id:'interfaces',title:'Connecting the outside world',summary:'Input/output organization enables communication between the computer and its environment. Interfaces are needed because devices differ from the CPU in transfer speed, data representation, and operating behavior.',analogy:'A translator helps two people who speak different languages and at different speeds communicate without losing information.',visual:'interface'},
  {id:'devices',title:'Types of peripheral devices',summary:'The lesson distinguishes human-readable peripherals, which communicate with people, and machine-readable peripherals, which communicate with equipment.',analogy:'A screen shows a person the temperature; a temperature sensor supplies a measurement to a machine.',visual:'devices'},
  {id:'transfer',title:'I/O modules & timing',summary:'An I/O module links the system bus to peripherals. Its four main functions in the lesson are control and timing, processor communication, device communication, and data buffering.',analogy:'A service desk checks whether someone is ready, accepts a request, gathers the item, and hands it over in the right order.',visual:'ioflow'},
  {id:'signals',title:'Communication & buffering',summary:'Processor communication includes command decoding, data exchange, status reporting, and address recognition. On the device side, control logic, a buffer, and a transducer help connect digital data to the external environment.',analogy:'A printer queue temporarily holds documents while a slower printer catches up. This is the idea behind buffering.',visual:'buffer'}]}
];
const terms=[];
function add(topic,section,page,rows){rows.forEach(r=>terms.push({id:r[0],term:r[1],definition:r[2],example:r[3],aliases:r[4]||[],note:r[5]||'',topic,section,page}));}
add('cpu','parts',1,[
 ['cpu','Central processing unit (CPU)','The electronic processing unit that interprets and executes program instructions.','The CPU executes the instructions needed to calculate 5 + 3.',['CPU','processor','central processing unit','computer processor']]
]);
add('cpu','parts',2,[
 ['alu','Arithmetic logic unit (ALU)','The CPU component that performs arithmetic calculations and logical operations.','Adding two numbers or comparing whether one value is larger uses the ALU.',['ALU','arithmetic and logic unit','arithmetic logic unit']],
 ['control-unit','Control unit','The CPU component that directs operations by interpreting instructions and issuing control signals.','It coordinates when data is fetched and when the ALU should operate.',['CU']],
 ['registers','Registers','Small, fast storage locations inside the processor that temporarily hold data, instructions, or addresses.','An intermediate result can stay in a register while the next operation is performed.',['register','CPU registers']],
 ['primary-storage','Primary storage','Main memory that holds programs and data currently being used by the processor.','RAM holds a running application and the data it is working on.',['main memory','primary memory','RAM']],
 ['secondary-storage','Secondary storage','Storage used to retain programs and data over the long term, rather than only during active processing.','An SSD stores your documents even after the computer is turned off.',['secondary memory']],
 ['io-unit','I/O unit','A computer-system component that provides input or output communication with external devices.','A keyboard supplies input; a monitor presents output.',['input output unit','input/output unit']]
]);
add('cpu','cycle',2,[
 ['instruction-cycle','Instruction cycle','The repeated process of fetching and executing program instructions, commonly explained as fetch, decode, execute, and write back.','After completing one instruction, the CPU normally begins fetching the next.',['basic instruction cycle','fetch execute cycle','fetch decode execute cycle']],
 ['fetch','Fetch','The instruction-processing step that retrieves the next program instruction from memory.','The CPU reads the instruction at the location indicated by the program counter.',['fetch cycle','fetch stage']],
 ['decode','Decode','The step that interprets an instruction to determine the operation and the information it needs.','The CPU recognizes that an instruction requests an addition.',['decoding','decode stage']],
 ['execute','Execute','The step in which the processor performs the operation specified by an instruction.','The ALU adds two values for an addition instruction.',['execution','execute stage','execute cycle']],
 ['write-back','Write back','The step that places an execution result into its destination, such as a register or memory.','An addition result is stored in a destination register.',['writeback','write-back','write back stage'],'The slides describe writing results to memory. Depending on the instruction and processor, a result may instead be written to a register; not every instruction produces a data result.'],
 ['ir','Instruction register (IR)','The processor register that holds the instruction currently being interpreted or executed.','After fetching an ADD instruction, the processor holds that instruction in the IR.',['IR','instruction register']]
]);
add('cpu','cycle',3,[
 ['pc','Program counter (PC)','The register that tracks the address of the next instruction to fetch.','A branch can change the next address from 150 to 182, as in the lesson.',['PC','program counter','instruction pointer']]
]);
add('cpu','instructions',3,[
 ['processor-memory','Processor–memory instruction','An instruction category that transfers data between the processor and memory.','Loading a stored value into the CPU is a processor–memory action.',['processor memory','processor memory transfer']],
 ['processor-io','Processor–I/O instruction','An instruction category that transfers data between the processor and an I/O module.','Reading a value from an input module is a processor–I/O action.',['processor io','processor input output','processor i/o']],
 ['data-processing','Data processing instruction','An instruction category that performs arithmetic or logical operations on data.','Adding values or testing a condition transforms or evaluates data.',['data processing']],
 ['control-instruction','Control instruction','An instruction category that changes the sequence in which instructions execute.','A branch sets the program counter to a different instruction address.',['control','control flow instruction','branch instruction']]
]);
add('cpu','buses',3,[
 ['system-bus','System bus','A shared communication pathway connecting the processor, memory, and I/O modules.','The CPU uses bus connections to request a value from main memory.',['bus','bus interconnection']],
 ['data-bus','Data bus','The set of bus lines that carries the actual data being transferred between system modules.','A 32-line data bus can carry 32 bits in one parallel transfer.',['data lines']],
 ['address-bus','Address bus','The set of bus lines that identifies the source or destination location of a transfer.','For a memory read, it identifies which memory location is requested.',['address lines']],
 ['bus-width','Data bus width','The number of separate data lines, determining how many bits can be carried in one parallel transfer.','A 64-bit data bus carries twice as many bits per transfer as a 32-bit bus.',['bus width'],'This is data width. Address-bus width instead determines the number of distinct addresses; the size of each addressed unit also matters.']
]);
add('cpu','buses',4,[
 ['control-bus','Control bus','The set of bus lines carrying signals that coordinate access to and use of the data and address lines.','A read signal tells the selected memory module to supply data.',['control lines']],
 ['bus-operation','Bus operation','The procedure of obtaining bus access and using it to transfer data or request data from another module.','To read: obtain the bus, identify and request the data, then wait for the selected module to respond.',['bus transfer']]
]);
add('cpu','performance',4,[
 ['clock-speed','Clock speed','The frequency of the processor clock, expressed as cycles per second.','A 3 GHz clock has approximately three billion clock cycles per second.',['clock frequency','clock rate'],'Clock frequency is not a direct count of completed instructions and is not, by itself, a complete measure of performance.'],
 ['hertz','Hertz (Hz)','The unit of frequency equal to one cycle per second.','One gigahertz (GHz) equals one billion hertz.',['Hz','hertz']],
 ['cache','Cache memory','Small, fast memory that keeps copies of useful instructions or data closer to the CPU to reduce access time.','Frequently reused data may be read from cache instead of slower main memory.',['cache','CPU cache'],'Cache is not simply the first block of main RAM. The lesson’s diagram is a simplified memory hierarchy.']
]);
add('cpu','performance',5,[
 ['l1','L1 cache','The first cache level, typically the smallest and fastest cache closest to a processor core.','The CPU checks a nearby L1 cache before needing a slower level.',['level 1 cache','level one cache','L1']],
 ['l2','L2 cache','The second cache level, typically larger and slower than L1 but faster than main memory.','Data not found in L1 may be available in L2.',['level 2 cache','level two cache','L2']],
 ['l3','L3 cache','A further cache level that is typically larger and slower than L1 and L2 and may be shared by several cores.','The processor diagram in the lesson shows a shared L3 cache.',['level 3 cache','level three cache','L3'],'Cache organization varies between processor designs.']
]);
add('cpu','cores',4,[
 ['core','Core','A physical execution unit within a processor that can carry out instructions.','A four-core processor contains four physical processing cores.',['processor core','CPU core','physical core']],
 ['thread','Thread','A sequence of software execution that a processor can work on.','A program may use one thread for its interface and another for background work.',['software thread'],'A software thread is work to execute; it is not a physical core. Logical processors are hardware execution contexts exposed to the OS.'],
 ['hyper-threading','Hyper-Threading','Intel technology that allows a supported physical core to expose two logical execution contexts that share core resources.','With this enabled, one supported core can handle two software threads.',['hyperthreading','hyper threading','HT','HTT'],'This does not add physical cores or guarantee twice the performance. See the Intel clarification in Sources.'],
 ['multiprocessing','Multiprocessing','The use of multiple processors or processing cores in one computer to carry out work.','Different cores can work on separate jobs at the same time.',['multi processing']],
 ['parallel-processing','Parallel processing','Performing parts of a computation at the same time using multiple processing resources.','Several cores each process a portion of one image.',['parallel computation'],'The lesson contrasts separate jobs with parts of one job. In practice, multiprocessing and parallel processing can overlap.']
]);
add('cpu','cores',5,[
 ['single-core','Single-core processor','A processor with one physical processing core.','One core handles the instruction work, with the OS able to switch between tasks.',['single core','single core processor']],
 ['dual-core','Dual-core processor','A processor with two physical processing cores.','Two cores can work on different runnable tasks concurrently.',['dual core','double core','dual core processor']],
 ['quad-core','Quad-core processor','A processor with four physical processing cores.','A suitable workload can be divided among four cores.',['quad core','quad core processor'],'Four cores need not be implemented as two dual-core chips. Brand labels such as i3, i5, and i7 do not specify a fixed core count.'],
 ['multicore','Multicore processor','A processor that contains more than one physical processing core.','Dual-core and quad-core processors are both multicore processors.',['multi core','multi-core','multicore processor']],
 ['intel','Intel','The processor company named in the lesson whose product families include Pentium and Core.','The lesson shows an Intel processor layout with cores and shared cache.',['Intel Corporation']],
 ['amd','Advanced Micro Devices (AMD)','The processor company named in the lesson whose name expands to Advanced Micro Devices.','AMD is shown alongside Intel as a processor manufacturer.',['AMD','advanced micro devices'],'Manufacturer names do not determine core count, speed, or security features of every model.']
]);
add('os','role',1,[
 ['os','Operating system (OS)','System software that manages computer resources and provides an interface and services between applications and hardware.','When an app saves a document, the OS coordinates access to storage.',['OS','operating system']],
 ['application','Application program','Software that performs a user task while relying on operating-system services.','A word processor lets you write documents and requests OS services to save them.',['application','app','application software']],
 ['hardware','Hardware','The physical components of a computer system that software uses or controls.','The CPU, memory chips, and a printer are hardware.',['computer hardware']]
]);
add('os','memory',1,[
 ['memory-management','Memory management','The OS responsibility for controlling and coordinating memory use, allocating space, and protecting memory.','The OS assigns memory to a new app and protects its own reserved region.'],
 ['memory-protection','Memory protection','Preventing unauthorized or accidental changes to protected memory areas.','An application should not overwrite the memory occupied by the OS.'],
 ['memory-allocation','Memory allocation','Assigning portions or blocks of memory to programs that need them.','The OS reserves space for a program and can reclaim that space when it finishes.',['allocation of memory']]
]);
add('os','processes',2,[
 ['processor-management','Processor management','The OS responsibility for tracking processes and deciding how CPU time is allocated.','The OS selects which ready process receives CPU time next.',['CPU management','process management']],
 ['process','Process','A program in execution, together with the state and resources needed to run it.','A running browser is represented by one or more processes.',['running process']],
 ['job-scheduler','Job scheduler','The scheduling level that selects jobs for admission into the set of active processes.','It decides which waiting jobs are admitted for processing.',['long term scheduler','long-term scheduler','job scheduling'],'The slides name this scheduler; this explanation supplies the usual long-term scheduling meaning.'],
 ['process-scheduler','Process scheduler','The scheduling level that selects a ready process to use the CPU next.','When one process must wait, it can select another ready process.',['CPU scheduler','short term scheduler','short-term scheduler','process scheduling'],'The slides name this scheduler; the example explains the usual short-term scheduling role.']
]);
add('os','resources',2,[
 ['device-management','Device management','The OS responsibility for tracking, allocating, and coordinating physical or virtual devices and their control units.','It coordinates requests from several programs to use one printer.'],
 ['file-management','File management','The OS responsibility for tracking files and controlling permitted access and operations on them.','It organizes files and determines whether a user can read or change a document.'],
 ['access-control','File access control','Rules that determine who can access a file and what actions they may perform.','A student may be allowed to read a file but not modify it.',['access control','file permissions','permissions']]
]);
add('io','interfaces',1,[
 ['io-organization','I/O organization','The arrangement of communication between the computer’s central system and the outside environment.','The system connects its processor and memory to keyboards, disks, and other devices.',['input output organization','input/output organization']],
 ['peripheral','Peripheral device','An external device linked through an I/O module to exchange information with a computer.','A printer or keyboard is a peripheral.',['peripheral','external device','peripherals']],
 ['io-interface','I/O interface','Hardware that connects CPU or internal-system communication to peripherals and resolves their communication differences.','An interface coordinates a transfer between a fast processor and a slower device.',['input output interface','input/output interface','interface unit','interface units']],
 ['transfer-rate','Data transfer rate','The amount of data a device or link transfers per unit of time.','A keyboard generally produces data far more slowly than a processor can handle it.',['transfer rate','data rate']],
 ['synchronization','Synchronization','Coordinating when communicating components send and receive data so the transfer happens correctly.','An interface waits for a ready indication before beginning a transfer.',['synchronisation']],
 ['data-format','Data format','The representation or organization used to encode data for a device or system.','A peripheral may transfer blocks while the processor works with words.',['data formats','data codes','data representation']],
 ['operating-mode','Operating mode','The way a peripheral operates and the control behavior it requires for communication.','A device may need a specific sequence of commands before it can send data.',['operating modes']]
]);
add('io','devices',2,[
 ['human-readable','Human-readable device','A peripheral suited to communicating with a human user.','The lesson lists keyboards, monitors, mice, and printers.',['human readable','human readable peripheral','human readable device']],
 ['machine-readable','Machine-readable device','A peripheral suited to communicating with equipment rather than directly with a human.','The lesson lists sensors and actuators.',['machine readable','machine readable peripheral','machine readable device']],
 ['sensor','Sensor','A device that detects a physical quantity and provides a corresponding signal or measurement.','A temperature sensor provides a measurement to a controller.',['sensors']],
 ['actuator','Actuator','A device that turns a control signal into a physical action.','An electrically controlled valve opens when it receives a command.',['actuators']]
]);
add('io','transfer',2,[
 ['io-module','I/O module','The hardware module that connects the system bus to peripheral links and coordinates I/O functions.','It receives processor commands and exchanges data with the connected device.',['input output module','input/output module']],
 ['control-timing','Control and timing','The I/O-module function that coordinates the order and timing of interactions between processor and device.','Check status, receive status, issue a command, obtain data, and transfer data to the processor.',['control timing','control & timing']],
 ['processor-communication','Processor communication','The I/O-module function that exchanges commands, data, status, and addressing information with the CPU.','The CPU sends a command and receives the module’s ready status.',['CPU communication']],
 ['device-communication','Device communication','The I/O-module function that exchanges control, status, and data with a connected peripheral.','The module sends a control signal to the device and receives data back.'],
 ['data-buffering','Data buffering','Temporarily storing data during a transfer to accommodate differences in transfer rates or timing.','Data waits in a printer buffer while the printer works through it.',['buffering']]
]);
add('io','signals',3,[
 ['command-decoding','Command decoding','Interpreting commands sent by the processor so the I/O module can perform the requested operation.','The module recognizes a read or write command.'],
 ['data-exchange','Data exchange','The transfer of actual information between the processor and I/O module over the data bus.','The module supplies a character value read from an input device.',['data transfer','data']],
 ['status-reporting','Status reporting','Providing information about the current state of an I/O device or module to the processor.','A module reports that the device is busy, ready, or idle.'],
 ['address-recognition','Address recognition','Recognizing the address that selects the intended I/O device or module.','Only the interface selected by a request should respond to it.',['address decoding']],
 ['control-logic','Control logic','The device circuitry that interprets control signals and coordinates the device’s internal operation.','The logic tells the device when to accept or deliver data.'],
 ['transducer','Transducer','A component that converts between a physical quantity or action and a signal representation.','A sensor converts a physical measurement to a signal; an actuator can convert a signal into action.',['transducers']],
 ['buffer','Buffer','A temporary storage area that holds data while it waits to be transferred or processed.','Characters wait in a keyboard buffer until the system reads them.',['data buffer'],'The buffer is the storage area; buffering is the process of using that area.']
]);
// Supporting terminology explicitly used in the slide text and diagrams.
add('cpu','cycle',2,[
 ['instruction','Instruction','An encoded command that tells the processor which operation to perform.','An ADD instruction tells the CPU to add specified operands.',['machine instruction','program instruction']]
]);
add('cpu','performance',4,[
 ['cache-controller','Cache controller','The control circuitry that manages accesses to cache and coordinates them with the memory system.','It helps determine whether a requested value is available in cache.']
]);
add('cpu','performance',5,[
 ['memory-controller','Memory controller','The hardware component that coordinates communication with main memory.','The processor layout in the lesson labels a memory controller beside the cores and shared cache.',['main memory controller']]
]);
add('os','role',1,[
 ['convenience','Convenience','The OS objective of making a computer system easier to use.','An application can request a file operation instead of directly controlling storage hardware.',['ease of use','usability']],
 ['resource-management','Resource management','The OS objective of organizing and allocating shared computer resources to programs.','The OS coordinates CPU time, memory space, devices, and file access.',['computer resource management']]
]);
add('io','interfaces',1,[
 ['bit','Bit','A binary digit that can represent one of two values, 0 or 1.','Each data-bus line can carry one bit at a time.',['binary digit']],
 ['byte','Byte','A group of eight bits, commonly used as a basic unit of data size.','The bit pattern 01000001 contains one byte.'],
 ['word','Word','A group of bits treated as a unit by a processor, with the size depending on its architecture.','A processor may work with a 16-bit or 32-bit word.',['processor word','machine word']],
 ['block','Block','A group of data units handled together during a transfer or storage operation.','A storage device can transfer a block containing multiple bytes.',['data block']]
]);
add('io','signals',3,[
 ['busy','Busy','A device status indicating that it is occupied with an operation and may not accept the next request yet.','A printer can report this state while carrying out a print operation.',['busy status']],
 ['ready','Ready','A device status indicating that it can participate in the requested transfer.','The processor checks for this state before requesting data from the device.',['ready status']],
 ['idle','Idle','A device status indicating that it is not currently carrying out an operation.','A device with no active task may report this state.',['idle status'],'Idle and ready are not always identical: a device can be inactive but still unavailable because of another condition.']
]);
const checks = [
 {topic:'cpu',q:'Which register changes when a branch selects a new next instruction?',a:'The program counter. The instruction register holds the current instruction.'},
 {topic:'cpu',q:'Does a wider data bus automatically mean more addressable memory?',a:'No. Data-bus width controls bits per parallel transfer. Address-bus width controls the number of possible addresses.'},
 {topic:'os',q:'Which OS responsibility decides whether you may edit a document?',a:'File management, through file access control and permissions.'},
 {topic:'io',q:'Why is a buffer useful between a CPU and a peripheral?',a:'It temporarily holds data so components with different rates or timing can communicate.'}
];
root.CURRICULUM={topics,terms,checks,version:1};
})(typeof window!=='undefined'?window:globalThis);
