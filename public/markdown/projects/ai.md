---
title: "AI, ML, LLM, and Agent"
description: "This document provides an overview of Artificial Intelligence (AI), Machine Learning (ML), Large Language Models (LLM), and Agents, explaining their definitions, differences, and applications."
time: "Sat Aug 15, 2026"
---

# AI, ML, LLM, and Agent

## Introduction

## Embedding

- [google embeddings](https://developers.google.com/machine-learning/crash-course/embeddings/obtaining-embeddings)

**Embedding** is a vector representation of data in embedding space.

- one-hot encoding: A method of representing categorical variables as binary vectors.
  - Each category is represented by a vector with a single high (1) value and all other values low (0).
  - Example: For three categories A, B, C, the one-hot encoding would be:
    - A: [1, 0, 0]
    - B: [0, 1, 0]
    - C: [0, 0, 1]

- **Static Embedding**: A fixed representation of data that does not change based on context (Word2Vec, GloVe).
- **Dynamic Embedding**: A representation of data that can change based on context or input (BERT, GPT).
- **Contextual Embedding**: A type of dynamic embedding that captures the meaning of words or phrases based on their surrounding context (BERT, GPT).

### Similarity

## Transformer

Transformer consists of an encoder and a decoder.

- The **encoder** processes the input data and generates a representation of it.
- The **decoder** takes the encoded representation and generates the output data.


Architectures:
- Encoder-Decoder architecture is used in tasks like machine translation, where the input sequence is encoded into a representation, and the decoder generates the output sequence.
- Encoder-only architecture is used in tasks like text classification, where the input sequence is encoded into a representation, and a classifier predicts the output label based on that representation.
- Decoder-only architecture is used in tasks like text generation, where the model generates output sequences based on a given input prompt.

Self-attention mechanism allows the model to weigh the importance of different words in a sequence, enabling it to capture long-range dependencies and relationships between words.

encoders use bidirectional self-attention, while decoders use unidirectional.

- Foundation (Base/Pre-trained) LLM: 
  - Pre-trained on large amounts of data and can be fine-tuned for specific tasks.
  - Examples: BERT, GPT-3, T5.
- Fine-tuned LLM: 
  - A pre-trained model that has been further trained on a specific task or dataset to improve performance on that task.
- Distillation LLM: 
  - A smaller model trained to mimic the behavior of a larger model, often used to reduce computational requirements while maintaining performance.