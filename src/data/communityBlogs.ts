import { Blog } from "@/types/blog";

/**
 * Community Blogs Data
 *
 * To add a new blog:
 * 1. Add a new object to the array below
 * 2. Increment the id
 * 3. Fill in all required fields
 *
 * Future: This will be replaced with Supabase API calls
 */

export const communityBlogs: Blog[] = [
    {
        id: 1,
        title: "How your choice of Optimisers affect your training (and why you should care)",
        link: "https://hackmd.io/@l_WDq7lkQq29Pz-KD1JPNA/SJL6n1PYgg",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/ChinmayKak",
        authorHandle: "@ChinmayKak",
    },
    {
        id: 2,
        title: "Is your LLM a wordcel or a shape rotator?",
        link: "https://www.krsna.space/projects/cubeeval/Is-your-LLM-a-wordcel-or-a-shape-rotator",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/OccupyingM",
        authorHandle: "@OccupyingM",
    },
    {
        id: 3,
        title: "Multiscale Muon",
        link: "https://publish.obsidian.md/ueaj/Machine+Learning/Research+Ideas/Multiscale+Muon",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/_ueaj",
        authorHandle: "@_ueaj",
    },
    {
        id: 4,
        title: "Pico 8 Adventures",
        link: "https://namishh.com/blog/devlogs/pico",
        category: "Game Dev x Experiments",
        authorTwitter: "https://x.com/namishh__",
        authorHandle: "@namishh__",
    },
    {
        id: 5,
        title: "A (hopefully) rigorous introduction to maximum likelihood estimation",
        link: "https://kevindayve.github.io/math/likelihood-estimation",
        category: "AI x Maths",
        authorTwitter: "https://x.com/kevindave__",
        authorHandle: "@kevindave__",
    },
    {
        id: 6,
        title: "Reprogramming Stem Cells with GPT-4b Micro",
        link: "https://medium.com/@nabbo/reprogramming-stem-cells-with-gpt-4b-micro-0982cc598ef2",
        category: "AI x Science",
        authorTwitter: "https://x.com/TensorTwerker",
        authorHandle: "@TensorTwerker",
    },
    {
        id: 7,
        title: "Optimizing a Layer Normalization Kernel with CUDA: a Worklog",
        link: "https://aryagxr.com/blogs/cuda-optimizing-layernorm",
        category: "AI Infra x Experiments",
        authorTwitter: "https://x.com/aryagxr",
        authorHandle: "@aryagxr",
    },
    {
        id: 8,
        title: "Attention sinks from the graph perspective",
        link: "https://publish.obsidian.md/the-tensor-throne/Transformers+as+GNNs/Attention+sinks+from+the+graph+perspective",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/tensorqt",
        authorHandle: "@tensorqt",
    },
    {
        id: 9,
        title: "Activation Steering With Mean Response Probes : A Case Study In Suppressing Sycophancy In Laguage Models During TTC",
        link: "https://huggingface.co/blog/TensorSlay/activation-steering-with-mean-response-probes#activation-steering-with-mean-response-probes--a-case-study-in-suppressing-sycophancy-in-laguage-models-during-ttc",
        category: "AI x Interpretability",
        authorTwitter: "https://x.com/TensorSlay",
        authorHandle: "@TensorSlay",
    },
    {
        id: 10,
        title: "On emergent misalignment from reward hacking",
        link: "https://secemp.blog/2025/11/24/on-emergent-misalignment-from-reward-hacking/",
        category: "AI x Experiments",
        authorTwitter: "https://x.com/secemp9",
        authorHandle: "@secemp9",
    },
];

/**
 * Get all unique categories from blogs
 */
export const getAllCategories = (): string[] => {
    return Array.from(new Set(communityBlogs.map(blog => blog.category)));
};
