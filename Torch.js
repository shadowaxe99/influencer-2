import Image from "next/image";
// Flame.js
const Flame = () => {
    return (
        <div class="fire">
            <div class="logs">
                <div class="log l1"></div>
                <div class="log l2"></div>
            </div>
            <div class="flames">
                <div class="flame f1"></div>
                <div class="flame f2"></div>
                <div class="flame f3"></div>
            </div>
            <div class="sparks">
                <div class="spark s1"></div>
                <div class="spark s2"></div>
                <div class="spark s3"></div>
                <div class="spark s4"></div>
                <div class="spark s5"></div>
                <div class="spark s6"></div>
                <div class="spark s7"></div>
                <div class="spark s8"></div>
            </div>
        </div>
    );
};

const Flame2 = () => {
    return (
        <div class="fire">
            <div class="fire-left">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
            </div>
            <div class="fire-center">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
            </div>
            <div class="fire-right">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
            </div>
            <div class="fire-bottom">
                <div class="main-fire"></div>
            </div>
        </div>
    );
};

export const Torch = () => {
    return (
        // <div className="torch">
        //     <Flame />
        // </div>

        <>
            <div className="torch-container">
                <div className="column hidden md:block"></div>
                <Flame2 />
            </div>
            {/* <div className="torch left-torch">
                
                <Image
                    src="/path_to_torch_without_flame.jpg"
                    alt="Left Torch"
                    width={25}
                    height={25}
                />
                <div className="flame"></div>
            </div>

            <div className="torch right-torch">
                <Image
                    src="/flame.png"
                    alt="Right Torch"
                    width={25}
                    height={25}
                />
                <div className="flame"></div>
            </div> */}
        </>
    );
};
