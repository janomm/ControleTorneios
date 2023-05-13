-- MySQL Script generated by MySQL Workbench
-- Thu May 11 21:47:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Arquetipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Arquetipo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Jogador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Jogador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `loginWizards` VARCHAR(50) NULL,
  `nick` VARCHAR(50) NULL,
  `senha` VARCHAR(255) NOT NULL,
  `dtNascimento` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Formato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Formato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Nome_UNIQUE` (`Nome` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Deck`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Deck` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idJogador` INT NOT NULL,
  `idArquetipo` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `idFormato` INT NOT NULL,
  `dtCriacao` DATETIME NULL,
  `dtAlteracao` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `idJogador_UNIQUE` (`idJogador` ASC) VISIBLE,
  UNIQUE INDEX `idArquetipo_UNIQUE` (`idArquetipo` ASC) VISIBLE,
  UNIQUE INDEX `idFormato_UNIQUE` (`idFormato` ASC) VISIBLE,
  CONSTRAINT `JogadorDeck`
    FOREIGN KEY (`idJogador`)
    REFERENCES `mydb`.`Jogador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ArquetipoDeck`
    FOREIGN KEY (`idArquetipo`)
    REFERENCES `mydb`.`Arquetipo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FormatoDeck`
    FOREIGN KEY (`idFormato`)
    REFERENCES `mydb`.`Formato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TipoTorneio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TipoTorneio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(40) NOT NULL,
  `Tipo` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Torneio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Torneio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idTipoTorneio` INT NOT NULL,
  `habilitaTorneio` TINYINT NULL,
  `nomeTorneio` VARCHAR(50) NOT NULL,
  `data` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `idTipoTorneio_UNIQUE` (`idTipoTorneio` ASC) VISIBLE,
  CONSTRAINT `TipoTorneioTorneio`
    FOREIGN KEY (`idTipoTorneio`)
    REFERENCES `mydb`.`TipoTorneio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`JogadorTorneio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`JogadorTorneio` (
  `idTorneio` INT NOT NULL,
  `idJogador` INT NOT NULL,
  `idDeck` INT NOT NULL,
  `posicao` INT NULL,
  `pontos` INT NULL,
  PRIMARY KEY (`idTorneio`, `idJogador`),
  INDEX `Jogador_JogadorTorneio_idx` (`idJogador` ASC) VISIBLE,
  INDEX `Deck_JogadorTorneio_idx` (`idDeck` ASC) VISIBLE,
  CONSTRAINT `Torneio_JogadorTorneio`
    FOREIGN KEY (`idTorneio`)
    REFERENCES `mydb`.`Torneio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Jogador_JogadorTorneio`
    FOREIGN KEY (`idJogador`)
    REFERENCES `mydb`.`Jogador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Deck_JogadorTorneio`
    FOREIGN KEY (`idDeck`)
    REFERENCES `mydb`.`Deck` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Ranking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ranking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idTipoTorneio` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `dtInicio` DATE NOT NULL,
  `dtFinal` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `TipoTorneio_Ranking_idx` (`idTipoTorneio` ASC) VISIBLE,
  CONSTRAINT `TipoTorneio_Ranking`
    FOREIGN KEY (`idTipoTorneio`)
    REFERENCES `mydb`.`TipoTorneio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`RankigJogador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`RankigJogador` (
  `idRanking` INT NOT NULL,
  `idJogador` INT NOT NULL,
  `pontuacao` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idRanking`, `idJogador`),
  INDEX `Jogador_RankingJogador_idx` (`idJogador` ASC) VISIBLE,
  CONSTRAINT `Ranking_RankingJogador`
    FOREIGN KEY (`idRanking`)
    REFERENCES `mydb`.`Ranking` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Jogador_RankingJogador`
    FOREIGN KEY (`idJogador`)
    REFERENCES `mydb`.`Jogador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
